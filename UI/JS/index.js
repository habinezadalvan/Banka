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

// AFTER SIGN UP PAGE
const showHiddenMenuArea = () => {
    document.getElementById('hidden-nav-bar').style.width = '20%';
    document.getElementById('main-areaPage').style.marginLeft = '20%';
    document.getElementById('navbarId').style.marginLeft = '20%';
    document.getElementById('barsMenu').style.display = 'none';
};
const closeHiddenMenuArea = () => {
    document.getElementById('hidden-nav-bar').style.width = '0';
    document.getElementById('main-areaPage').style.marginLeft = '0';
    document.getElementById('navbarId').style.marginLeft = '0';
    document.getElementById('barsMenu').style.display = 'block';
    document.getElementById('barsMenu').style.transitionDelay= '1.2s';
};

// CREATE ACOUNT FIELD

// display create account
const showCreateAccount = () =>{
    document.getElementById('usercreateAccount').style.display = 'block';
    document.getElementById('usercreateAccount').style.scaleY = '1.2s';
}
// close create account
const closeCreateAccount = () =>{
    document.getElementById('usercreateAccount').style.display = 'none'; 
}
console.log('hey there')