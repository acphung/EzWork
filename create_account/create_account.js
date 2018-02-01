function create_cancel(){
	// redirect user to homepage here //
	// *********** ADD CODE **********
}

function create(){
	document.getElementById("bad_checkbox").style.display = "none";
	document.getElementById("bad_password").style.display = "none";
	document.getElementById("bad_password2").style.display = "none";
	document.getElementById("bad_userid").style.display = "none";
	document.getElementById("bad_email").style.display = "none";
	
  var userEmail = document.getElementById("create_email_field").value;
  var userPass = document.getElementById("create_password_field").value;
  var userPass2 = document.getElementById("create_password2_field").value;
  var userID = document.getElementById("create_userid_field").value;
  // confirm that user selected a checkbox //
  var acctype = "";
  if(document.getElementById("finder_checkbox").checked){
	  acctype = "finder";
  }else if(document.getElementById("employer_checkbox").checked){
	  acctype = "employer";
  }else{
	  document.getElementById("bad_checkbox").style.display = "block";
	  return;
  }
  // search users database to make sure userID is unique //
  return firebase.database().ref('users/' + userID).once('value', function(snapshot) {
	var username = (snapshot.val() && snapshot.val().username);
	if(username == null){
		//username is unique//
		var success = true;
		if(userPass !== userPass2){
			document.getElementById("bad_password2").style.display = "block";
			return;
		}
		firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
			firebase.database().ref('users/' + userID).set({
				username: userID,
				email: userEmail,
				type: acctype});
			//we succeeded so redirect user to homepage here //
			// ********* ADD CODE *********
		}).catch(function(error) {
		// Handle account creation errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// determine if email or password error and display //
		if(errorCode == "auth/weak-password"){
			document.getElementById("bad_password").style.display = "block";
		}else{
			document.getElementById("bad_email").innerHTML = errorMessage;
			document.getElementById("bad_email").style.display = "block";
		}
		});
	}else{
		// username is not unique //
		document.getElementById("bad_userid").style.display = "block";
	}
  });
}

function uncheck_employer(){
	document.getElementById("employer_checkbox").checked = false;
}

function uncheck_finder(){
	document.getElementById("finder_checkbox").checked = false;
}
