function login_display () {
    if(firebase.auth().currentUser) {
        document.getElementById("login-div").style.display = "none";
        document.getElementById("logged-in-div").style.display = "block";
    } else {
        document.getElementById("login-div").style.display = "block";
        document.getElementById("logged-in-div").style.display = "none";
    }
}

function gotoSignup() {
    window.location.href = "./create_account/create_account.html";
}

function login() {
    document.getElementById("bad_password").style.display = "none";
	document.getElementById("bad_userid").style.display = "none";

	var userPass = document.getElementById("password_field").value;
	var userID = document.getElementById("userid_field").value;

    // Search Database for the User //
    firebase.database().ref('users/' + userID).once('value', function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username);
        if(username !== null){
            //username Exists//
            var userEmail = snapshot.val().email;
            firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
                //Login is Successful //
                // ********* ADD CODE *********
                // alert("Login Successful!");
                // login_display();
            }).catch(function(error) {
                // Handle account creation errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // determine if email or password error and display //
                if(errorCode == "auth/wrong-password"){
                    document.getElementById("bad_password").style.display = "block";
                }
            });
        }else{
            // Username is Incorrect or Doesn't Exist //
            document.getElementById("bad_userid").style.display = "block";
        }
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
