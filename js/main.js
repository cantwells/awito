/*=====================элемнты DOM====================================================*/
const btnAddAd = document.querySelector('.add__ad'), //Кнопка Подать объявление
    modalAdd = document.querySelector('.modal__add'), //Модалка добавления товара
    modalSubmit = document.querySelector('.modal__submit'), //Форма в модалке добавления товара
    modalBtnSubmit = document.querySelector('.modal__btn-submit'), //Кнопка в нутри модалки Отправить
    modalMsgWarning = document.querySelector('.modal__msg-warning'), //Сообщение о не заполненатости всех полей формы
    catalog = document.querySelector('.catalog'), // ul с картачками
    modalItem = document.querySelector('.modal__item'), //Модалка с инфой о товаре
    // modalFileLabel = document.querySelector('.btn.modal__file-label'), //Обертка для кнопки Добавить фото
    modalFileBtn = document.querySelector('.modal__file-btn'), //псевдо кнопка Добавить фото
    modalFileInput = document.querySelector('.modal__file-input'), //инпут получения файла
    modalImageAdd = document.querySelector('.modal__image-add'), //Изображение внутри модального окна
    modal = document.querySelector('.modal'); //Общий класс для модалок

//Константы для возможности восстанавливать значения при закрытие модального окна
const TEMP_IMG = 'img/temp.jpg';
const DEFAULT_TXT = 'Добавить фото';

//Объекст с данными фотографии
const infoPhoto = {};

//Получаем все элементы формы для добавления товара, кроме кнопки
const formElements = [...modalSubmit.elements].filter(item => item.tagName !== 'BUTTON');

//Добавляем данные из LocalStorage или устанавливают пустую
const dataBase = JSON.parse(localStorage.getItem('awito')) || [];
/*========================Функции ==================================================*/

//Сохраняем данные в локал сторадж
const saveDB = db => localStorage.setItem('awito', JSON.stringify(db));

//Функция закрытия модального окна
const closeModal = (event) => {
    const target = event.target;
    //Закрываем все модальные окна при нажатии на диве
    if (target.classList.contains('modal__close') ||
        target.classList.contains('modal') || event.key == "Escape") {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
        modalItem.classList.add('hide');
        //Удаление обработчика событий
        modalAdd.removeEventListener('click', closeModal);
        modalItem.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        modalSubmit.removeEventListener('input', sendAbility);
        modalSubmit.removeEventListener('submit', sendForm);
        modalFileInput.removeEventListener('change', loadImage);
        //После небольшой паузы возвращаем картинку и текст в кнопке по умолчанию
        setTimeout(() => {
            modalImageAdd.src = TEMP_IMG;
            modalFileBtn.textContent = DEFAULT_TXT;
        }, 300);
    }
}

//Проверка заполнения полей формы
const checkForm = () => formElements.every(item => item.value);

//Функция для события отображения скрытия текста и аткивации кнопки
const sendAbility = event => {
    modalBtnSubmit.disabled = !checkForm();
    modalMsgWarning.style.display = checkForm() ? 'none' : '';
}

const loadImage = event => {
    //Получаем специальный объект File в котором храняться данные по файлу
    const file = modalFileInput.files[0];
    //Сохраняем имя файла (нужно для отображение при выбере)
    infoPhoto.filename = file.name;
    //Сохраняем размер изображения (нужно для проверки файла на размер)
    infoPhoto.size = file.size;

    if (file.size < 40000) {
        //Получаем экземпляр класса для асихроной загрузки файла
        const reader = new FileReader();
        //задаём что хотим получить спец тип base64 в виде data url
        reader.readAsDataURL(file);
        //вешаем событие, после загрузки изображения получить data url 
        reader.addEventListener('load', event => {
                //добавляем в объект
                infoPhoto.url = event.target.result;
                //устанавливаем картинку в модальное окно
                modalImageAdd.src = infoPhoto.url;
            })
            //сбрасыаем фон по умолчанию
        modalFileBtn.style.background = '';
        //Указываем имя файла
        modalFileBtn.textContent = file.name;
        //Обрабатываем форму добавления товара
        modalSubmit.addEventListener('submit', sendForm);
    } else {
        //Если файл больше нужного размера
        //Задаем нужный фон
        modalFileBtn.style.background = '#BF3F4A';
        //Выводит предупреждающее сообщение
        modalFileBtn.textContent = 'Превышен размер 40Мб';
        //Сбрасываем поле Input
        modalFileInput.value = '';
        //Проверяем можно ли отображать кнопку и сообщение
        checkForm();
    }
}

//Отрисовка карточек товаров
const renderCards = () => {
    catalog.textContent = '';
    dataBase.forEach((item, i) => {
        const card = `
            <li class="card" data-id="${i}">
                <img class="card__image" src=${item.url} alt="test">
                <div class="card__description">
                <h3 class="card__header">${item.nameItem}</h3>
                <div class="card__price">${item.costItem} ₽</div>
                </div>
            </li>
            `;
        catalog.insertAdjacentHTML('beforeEnd', card);
    });
}

//Отправка формы
const sendForm = event => {
        event.preventDefault();
        const objElem = {};
        formElements.forEach(item => {
            objElem[item.name] = item.value;
        })
        objElem.url = infoPhoto.url;
        dataBase.push(objElem);
        saveDB(dataBase);
        closeModal({ target: modalAdd });
        renderCards();
    }
    /*=========================Обработчики событий======================================*/

//По кнопке открываем модальное окно с добавление товара
btnAddAd.addEventListener('click', event => {
    modalAdd.classList.remove('hide');
    //скрываем предупреждающую надпись
    modalBtnSubmit.disabled = true;
    //Закрываем модальное окно с товаром
    modalAdd.addEventListener('click', closeModal);
    //Закрываем модальные окна по нажатию Esc
    document.addEventListener('keydown', closeModal);

    //Отображаем/скрываем предупреждающее сообщение, и делаем кнопку активной или нет
    modalSubmit.addEventListener('input', sendAbility);

    //Получение фото товара
    modalFileInput.addEventListener('change', loadImage);
});

//Открываем модальное окно с товаром
catalog.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        //Закрываем модальное окно с товаром
        modalItem.addEventListener('click', closeModal);
        //Закрываем модальные окна по нажатию Esc
        document.addEventListener('keydown', closeModal);
    }
})

if (dataBase) renderCards();