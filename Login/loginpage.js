firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("create_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
	document.getElementById("create_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function signup(){
    document.getElementById("user_div").style.display = "none";
	document.getElementById("create_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
}

function create_cancel(){
    document.getElementById("user_div").style.display = "none";
	document.getElementById("create_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
}

function test(userID){
	return firebase.database().ref('users/' + userID).once('value', function(snapshot){
		false;
	});
	return true;
}

function create(){
  var userEmail = document.getElementById("create_email_field").value;
  var userPass = document.getElementById("create_password_field").value;
  var userID = document.getElementById("create_userid_field").value;
  // search users database to make sure userID is unique //
  return firebase.database().ref('users/' + userID).once('value', function(snapshot) {
	var username = (snapshot.val() && snapshot.val().username);
	window.alert("Username: " + username);
	if(username == null){
		window.alert("username is unique");
		var success = true;
		firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
		// Handle account creation errors here.
		success = false;
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert("Error : " + errorMessage);
		});
		if(success){
			window.alert("Successful account creation: "+userID);
			firebase.database().ref('users/' + userID).set({
				username: userID,
				email: userEmail,
				type: "finder"});
		}
	}else{
		window.alert("Username not unique");
	}
  });
}

function logout(){
  firebase.auth().signOut();
}
