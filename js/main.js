//Получаем элемнты DOM
const btnAddAd = document.querySelector('.add__ad'),
    modalAdd = document.querySelector('.modal__add'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modal = document.querySelector('.modal'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit');

//По кнопке открываем модальное окно с добавление товара
btnAddAd.addEventListener('click', event => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

//Зыкрываем модальное окно с добавлением товара
modalAdd.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('modal__close') || target == modalAdd)
        modalAdd.classList.add('hide');
})

//Открываем модальное окно с товаром
catalog.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.catalog'))
        modalItem.classList.remove('hide');
})

//Закрываем модальное окно с товаром
modalItem.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('modal__close') || target == modalItem)
        modalItem.classList.add('hide');
})

//Закрываем модальные окна по нажатию Esc
document.addEventListener('keydown', event => {
    if (event.keyCode == 27) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('hide');
        })
    }
})