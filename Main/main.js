function login_display () {
    if(firebase.auth().currentUser) {
        document.getElementById("guest-div").style.display = "none";
        document.getElementById("user-div").style.display = "block";
    } else {
        document.getElementById("guest-div").style.display = "block";
        document.getElementById("user-div").style.display = "none";
    }
}

function gotoSignup() {
    window.location.href = "./create_account/create_account.html";
}

function login() {
        document.getElementById("bad_login").style.display = "none";

	var userPass = document.getElementById("password_field").value;
	var userEmail = document.getElementById("email_field").value;

        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
                //Login is Successful //
                // ********* ADD CODE *********
                // alert("Login Successful!");
                // login_display();
                document.getElementById("bad_login").style.display = "none";
        }).catch(function(error) {
                // Handle account creation errors here.
                document.getElementById("login_error").innerHTML = error.message;
                document.getElementById("bad_login").style.display = "block";
        });
}

function logout() {
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log('Logging in User');
    } else {
        console.log('Logging out User');
    }
    login_display();
});
