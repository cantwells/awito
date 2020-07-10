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
    //Закрываем все модальные окна при нажатии на диве
    if (target.classList.contains('modal__close') ||
        target.classList.contains('modal') || event.key == "Escape") {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
        modalItem.classList.add('hide');
        //Удаление обработчика событий
        modalItem.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
    }
}


/*=========================Обработчики событий======================================*/

//По кнопке открываем модальное окно с добавление товара
btnAddAd.addEventListener('click', event => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    //Закрываем модальное окно с товаром
    modalItem.addEventListener('click', closeModal);
    //Закрываем модальные окна по нажатию Esc
    document.addEventListener('keydown', closeModal);
});

//Зыкрываем модальное окно с добавлением товара
modalAdd.addEventListener('click', closeModal);

//Открываем модальное окно с товаром
catalog.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        console.log('opent window item');
        modalItem.classList.remove('hide');
        //Закрываем модальное окно с товаром
        modalItem.addEventListener('click', closeModal);
        //Закрываем модальные окна по нажатию Esc
        document.addEventListener('keydown', closeModal);
    }
})