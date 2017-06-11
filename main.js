function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    setLogo(profile.getImageUrl(), profile.getName())
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    delLogo()
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