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

function gotoSignup() {
    window.location.href = "../create_account/create_account.html";
}

function login() {
        document.getElementById("bad_login").style.display = "none";

	var userPass = document.getElementById("psw").value;
	var userEmail = document.getElementById("email").value;
        if(userEmail == ""){
                document.getElementById("login_error").innerHTML = "Email address cannot be empty.";
                document.getElementById("bad_login").style.display = "block";
        }else if(userPass == ""){
                document.getElementById("login_error").innerHTML = "Password cannot be empty.";
                document.getElementById("bad_login").style.display = "block";
        }else{
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
                //Login is Successful //
				document.getElementById("psw").value = "";
                document.getElementById("bad_login").style.display = "none";
                toggle_visibility("login_pop");
                login_display();
        }).catch(function(error) {
                // Handle account creation errors here.
                document.getElementById("login_error").innerHTML = error.message;
                document.getElementById("bad_login").style.display = "block";
        });}
}

function logout() {
    firebase.auth().signOut();
}

/*
firebase.auth().onAuthStateChanged(function(user){
    if(user) {
		firebase.database().ref('users/' + user.email.replace('.','(')).once('value', function(snapshot) {
			var username = snapshot.val().username;
			document.getElementById("welcome_guest").style.display = "none";
			document.getElementById("welcome_user_text").innerHTML = "Hello " +
					username;
			document.getElementById("welcome_user").style.display = "block";});
    } else {
        document.getElementById("welcome_guest").style.display = "block";
        document.getElementById("welcome_user").style.display = "none";
    }
});*/

function open_job_popup(id){
	window.alert("Job ID \""+id+"\" clicked.");
}

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
        e.style.display = 'none';
   else
        e.style.display = 'block';
}

/*
function page_init(){
	var array = [];
	for(var i = 1; i <= 100; i++){
		array.push(i.toString());
	}
    // Reduce will iterate over all the array items and returns a single value.
    listItems = array.reduce((result, item) => {
    // Add a string to the result for the current item. This syntax is using template literals.
    result += "<li><p id='Job" + `${item}` + "' onclick=\"open_job_popup('Ident Goes Here')\">";
	result += "Job" + `${item}`;
	result += "</p></li>";
    // Always return the result in the reduce callback, it will be the value or result in the next iteration.
    return result;
  }, ''); // The '' is an empty string, it is the initial value result.
  // Get the element from the DOM in which to display the list, this should be an ul or ol element.
  resultElement = document.getElementById('jobList');

// Set the inner HTML
resultElement.innerHTML = listItems;
}
page_init();*/

function updProf() {
	var user = firebase.auth().currentUser;
	if(user){
		var emailFixed = user.email.replace('.','(');
		firebase.database().ref("users/"+emailFixed).once("value", function(snapshot){
			const userRef = firebase.database().ref("users/"+emailFixed);
			var employerBox = document.querySelector("#box4").value;
			var cityBox = document.querySelector("#box5").value;
			var abtBox = document.querySelector("#box6").value;
			var profEmp = "profEmpBox";
			var profCity = "profCityBox";
			var profAbt = "profAbtBox";
			
			if(employerBox){
				userRef.child(profEmp).set(employerBox);
			}
			if(cityBox){
				userRef.child(profCity).set(cityBox);
			}
			if(abtBox){
				userRef.child(profAbt).set(abtBox);
			}
		});	
	}
}

function loadStart() {
	var user = firebase.auth().currentUser;
	window.alert("Welcome to your profile!");
	if(user){
		var emailFixed = user.email.replace('.','(');
		firebase.database().ref("users/"+emailFixed).once("value", function(snapshot){
			const userRef = firebase.database().ref("users/"+emailFixed);
			
			var employerBoxLoad = snapshot.val().profEmpBox;
			var cityBoxLoad = snapshot.val().profCityBox;

			var abtBoxLoad = snapshot.val().profAbtBox;
			
			
			document.getElementById("emp").innerHTML = employerBoxLoad;
			document.getElementById("cit").innerHTML = cityBoxLoad;
			document.getElementById("abt").innerHTML = abtBoxLoad;
		});
	}
}

function startFirst() {
	var user = firebase.auth().currentUser;
	var shouldBeNull = user;
	window.alert("K"+shouldBeNull+"edge is power");
}
startFirst();


