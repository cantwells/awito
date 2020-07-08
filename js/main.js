//Получаем элемнты DOM
const btnAddAd = document.querySelector('.add__ad'),
    modalAdd = document.querySelector('.modal__add'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modal = document.querySelector('.modal'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit');

btnAddAd.addEventListener('click', event => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

modal.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('modal__close') || target.classList.contains('modal'))
        modal.classList.add('hide');
})