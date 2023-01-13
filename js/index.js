const menuButton = document.getElementById('menu-button');

menuButton.addEventListener('click', toggleMenu)

function toggleMenu() {
    menuButton.classList.toggle('menu-button-opened');
    document.getElementById('primary-navigation').classList.toggle('nav-expanded');
    
}