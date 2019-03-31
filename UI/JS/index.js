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
// DISPLAY SIGN UP
const signupFunction = () =>{
    document.getElementById('userSignUp').style.display = 'block';
    document.getElementById('userSignUp').style.scaleY = '1.2s';
}
// CLOSE SIGN UP
const closeSignUpFunction = () =>{
    document.getElementById('userSignUp').style.display = 'none'; 
}

// DISPLAY LOGIN

const loginFunction = () =>{
    document.getElementById('userLogin').style.display = 'block';
    document.getElementById('userLogin').style.scaleY = '1.2s';
}

const closeLignFunction = () =>{
    document.getElementById('userLogin').style.display = 'none'; 
}