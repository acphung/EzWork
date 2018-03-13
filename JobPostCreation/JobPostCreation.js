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
$('textarea').keypress(function(event) {
   if (event.which == 13) {
      event.preventDefault();
      var s = $(this).val();
      $(this).val(s+"\n");
   }
});​*/

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
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
var geocoder;
function mapInit(){
	geocoder = new google.maps.Geocoder();
}

function writeJob(){
	var user = firebase.auth().currentUser;
	if(user){
		var emailFixed = user.email.replace('.','(');
		firebase.database().ref("users/"+emailFixed).once("value", function(snapshot){
			const jobRef = firebase.database().ref("jobs");
			const userJobRef = firebase.database().ref("users/"+emailFixed+"/jobs");
			var jobEmployer = snapshot.val().username;
			var jobTitle = document.querySelector("#Title").value;
			var jobLoc = document.querySelector("#Location").value;
			var jobPostDate = new Date();
			var day = jobPostDate.getDate();
			var month = jobPostDate.getMonth()+1;
			var year = jobPostDate.getFullYear();
			if(day < 10){
				day = "0" + day;
			}
			if(month < 10){
				month = "0" + month;
			}
			jobPostDate = month + "/" + day + "/" + year;
			var jobPay = document.querySelector("#Payment").value;
			var jobType = "Empty";

			if(document.querySelector("#full").checked){
				jobType = "Full-Time";
			}
			if(document.querySelector("#part").checked){
				jobType = "Part-Time";
			}
			if(document.querySelector("#small").checked){
				jobType = "Small-Time";
			}
			if(document.querySelector("#once").checked){
				jobType = "Once";
			}
			var jobDesc = document.querySelector("#Desc").value;
			var jobLat = "empty";
			var jobLng = "empty";
			geocoder.geocode({"address":jobLoc}, function(results, status) {
				if(status == 'OK'){
					var loc = results[0].geometry.location;
					jobLat = loc.lat();
					jobLng = loc.lng();
				}
				else{
					window.alert("failure");
				}
				var jobData = {
					employer: jobEmployer,
					lat: jobLat,
					lng: jobLng,
					loc: jobLoc,
					posted: jobPostDate,
					notes: jobDesc,
					pay: jobPay,
					pic: "Sample Pic",
					title: jobTitle,
					type: jobType
				};
				var newJob = jobRef.push(jobData);
				var newJobKey = newJob.key;
				userJobRef.child(newJobKey).set(newJobKey);
				window.location.href = "../Main/EzWork2.html";
			});
		});
	}
}
