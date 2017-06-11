let initObjAPI = {};

function start() {
    gapi.load('client:auth2', initClient)
}

function initClient () {
    const params = {
        client_id: '982596103606-3lfc4uhonegobtjvjsgvnvij5j27aml2.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: "profile email",
        response_type: "code"
    };

    gapi.auth2.init(params)
        .then((initObj) => {
            initObjAPI = initObj;
        })
}

function login() {
    initObjAPI.signIn()
        .then((googleUser) => onSignIn(googleUser))
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    delLogo()
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var authResp = googleUser.getAuthResponse();
    console.log('AuthData: ', authResp);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    setLogo(profile.getImageUrl(), profile.getName())
}

function setLogo(logoUrl, userName) {
    const el = document.getElementById("user");
    const login = document.getElementById("loginBtn");
    const logo = document.getElementsByClassName("user__logo");
    const name = document.getElementsByClassName("user__name");
    el.className += " open";
    login.classList.remove("open");
    logo && logo.length > 0 && (logo[0].src = logoUrl);
    name && name.length > 0 && (name[0].innerHTML = userName);
}

function delLogo() {
    const el = document.getElementById("user");
    const login = document.getElementById("loginBtn");
    el.classList.remove("open");
    login.className += " open";
}

