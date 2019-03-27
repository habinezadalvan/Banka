// javascript for the hiden side menu

const showHiddenMenu = () => {
    document.getElementById('hidden-nav-bar').style.width = '15%';
    document.getElementById('main-area').style.marginLeft = '15%';
};
const closeHiddenMenu = () => {
    document.getElementById('hidden-nav-bar').style.width = '0';
    document.getElementById('main-area').style.marginLeft = '0';
};

