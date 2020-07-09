/*=====================элемнты DOM====================================================*/
const btnAddAd = document.querySelector('.add__ad'), //Кнопка Подать объявление
    modalAdd = document.querySelector('.modal__add'), //Модалка добавления товара
    modalBtnSubmit = document.querySelector('.modal__btn-submit'), //Кнопка в нутри модалки Отправить
    modalSubmit = document.querySelector('.modal__submit'), //Форма в модалке добавления товара
    catalog = document.querySelector('.catalog'), // ul с картачками
    modalItem = document.querySelector('.modal__item'), //Модалка с инфой о товаре
    modal = document.querySelector('.modal'); //Общий класс для модалок

/*========================Функции ==================================================*/

//Функция закрытия модального окна
const closeModal = event => {
    const target = event.target;

    if (target.classList.contains('modal__close')) {
        if (target.closest('.modal__add')) {
            modalAdd.classList.add('hide');
            modalSubmit.reset();
        } else if (target.closest('.modal__item')) {
            modalItem.classList.add('hide');
        }
    } else {
        if (target.classList.contains('modal') || event.keyCode == 27) {
            modalAdd.classList.add('hide');
            modalSubmit.reset();
            modalItem.classList.add('hide');
        }
    }
}

/*=========================Обработчики событий======================================*/

//По кнопке открываем модальное окно с добавление товара
btnAddAd.addEventListener('click', event => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

//Зыкрываем модальное окно с добавлением товара
modalAdd.addEventListener('click', closeModal);

//Открываем модальное окно с товаром
catalog.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.card'))
        modalItem.classList.remove('hide');
})

//Закрываем модальное окно с товаром
modalItem.addEventListener('click', closeModal);

//Закрываем модальные окна по нажатию Esc
document.addEventListener('keydown', closeModal);