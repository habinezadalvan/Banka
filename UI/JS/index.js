// javascript for the hiden side menu

const showHiddenMenu = () => {
    document.getElementById('hidden-nav-bar').style.width = '15%';
    document.getElementById('main-area').style.marginLeft = '15%';
    document.getElementById('navbarId').style.marginLeft = '15%';
    document.getElementById('footerId').style.marginLeft = '15%';
    document.getElementById('barsmenu').style.display = 'none';
};
const closeHiddenMenu = () => {
    document.getElementById('hidden-nav-bar').style.width = '0';
    document.getElementById('main-area').style.marginLeft = '0';
    document.getElementById('navbarId').style.marginLeft = '0';
    document.getElementById('footerId').style.marginLeft = '0';
    document.getElementById('barsmenu').style.display = 'block';
    document.getElementById('barsmenu').style.transitionDelay= '1.2s';
};

const signupFunction = () =>{
    document.getElementById('userSignUp').style.display = 'block';
    document.getElementById('userSignUp').style.scaleY = '1.2s';
}

const closeSignUpFunction = () =>{
    document.getElementById('userSignUp').style.display = 'none'; 
}