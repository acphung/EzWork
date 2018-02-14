function login_display () {
    if(firebase.auth().currentUser) {
        document.getElementById("welcome_guest").style.display = "none";
        document.getElementById("welcome_user_text").innerHTML = "Hello " +
                firebase.auth().currentUser.email;
        document.getElementById("welcome_user").style.display = "block";
    } else {
        document.getElementById("welcome_guest").style.display = "block";
        document.getElementById("welcome_user").style.display = "none";
    }
}

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block'){
        e.style.display = 'none';
   }else{
        e.style.display = 'block';}
}

function logout() {
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user){
    if(user) {
		firebase.database().ref('users/' + user.email.replace('.','(')).once('value', function(snapshot) {
			var username = snapshot.val().username;
			var type = snapshot.val().type;
			document.getElementById("welcome_guest").style.display = "none";
			document.getElementById("welcome_user_text").innerHTML = "Hello " +
					username;
			document.getElementById("welcome_user").style.display = "block";
			if(type === "employer")
				document.getElementById("post_job_button").style.display = "block";
			if(type === "finder")
				document.getElementById("adv_search_button").style.display = "block";
			document.getElementById("prof_button").style.display = "block";});
    } else {
        document.getElementById("welcome_guest").style.display = "block";
        document.getElementById("welcome_user").style.display = "none";
		document.getElementById("post_job_button").style.display = "none";
		document.getElementById("adv_search_button").style.display = "none";
		document.getElementById("prof_button").style.display = "none";
    }
});