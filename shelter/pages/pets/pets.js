const burgerMenu = document.querySelector('.burger__menu');
if (burgerMenu) {
    const menu = document.querySelector('.menu');
    burgerMenu.addEventListener("click", function (e) {
        burgerMenu.classList.toggle('_active');
        menu.classList.toggle('_active');
    });

}