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
});

function open_job_popup(id){
	window.alert("Job ID \""+id+"\" clicked.");
	firebase.database().ref('jobs/'+id).once('value', function(snapshot) {
		var empname = snapshot.val().employer;
		var title = snapshot.val().title;
		var notes = snapshot.val().notes;
		var loc = snapshot.val().loc;
		var dist = "Distance Not Yet Implimented";
		var tags = "Tags Not Yet Implimented";
		var img = snapshot.val().pic;
		var type = snapshot.val().type;
		/*etc*/
		document.getElementById("job_pop_employer").innerHTML = empname;
		document.getElementById("job_pop_title").innerHTML = title;
		document.getElementById("job_pop_notes").innerHTML = notes;
		document.getElementById("job_pop_loc").innerHTML = loc;
		document.getElementById("job_pop_dist").innerHTML = dist;
		document.getElementById("job_pop_tags").innerHTML = tags;
		document.getElementById("job_pop_type").innerHTML = type;
		/*etc*/
		toggle_visibility("job_pop"); /* or whatever it's called */
	});
}

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block'){
        e.style.display = 'none';
		document.getElementById("popups").style.display = 'none';
   }else{
        e.style.display = 'block';
		document.getElementById("popups").style.display = 'block';}
}

function hide_popups(){
	document.getElementById("login_pop").style.display = 'none';
	document.getElementById("popups").style.display = 'none';
	document.getElementById("job_pop").style.display = 'none';
}

function fill_jobs_list(){
	firebase.database().ref('jobs').once('value', function(snapshot){
		var ordered_jobs_id = [];
		for (var job_id in snapshot.val()){
			//insertion sort
			ordered_jobs_id.unshift(job_id);
			//goes here
		}
		var jobcount = ordered_jobs_id.length;
		var i = 0;
		for (i = 0; i < jobcount; i++){
			//window.alert(ordered_jobs_id[i]);
			var curr = ordered_jobs_id[i].toString();
			//window.alert(curr);
			var subsnap = snapshot.child(curr);
			var empname = subsnap.child("employer").val();
			var titlename = subsnap.child("title").val();
			//window.alert(empname);
			//window.alert(titlename);
			/*etc*/
			document.getElementById("Job"+(i+1).toString()).style.display = "block";
			document.getElementById("Job"+(i+1).toString()).setAttribute( "onclick", "open_job_popup('"+curr+"')");
			document.getElementById("Job"+(i+1).toString()+"_employer").innerHTML = empname;
			document.getElementById("Job"+(i+1).toString()+"_title").innerHTML = titlename;
			/*etc*/
	
		}for (i; i < 100; i++){
			document.getElementById("Job"+(i+1).toString()).style.display = "none";
		}
	});
}

function page_init(){
	var array = [];
	for(var i = 1; i <= 100; i++){
		array.push(i.toString());
	}
    // Reduce will iterate over all the array items and returns a single value.
    listItems = array.reduce((result, item) => {
		// Add a string to the result for the current item. This syntax is using template literals.
		result += "<li id=\"Job" + `${item}` + "\" onclick=\"open_job_popup('Ident Goes Here')\" style=\"display:none;\">"
		result += "<p id=\"Job" + `${item}` + "_title\">";
		result += "Job" + `${item}`;
		result += "</p><p id=\"Job" + `${item}` +"_employer\">job_employer</p></li>";
		// Always return the result in the reduce callback, it will be the value or result in the next iteration.
		return result;
    }, ''); // The '' is an empty string, it is the initial value result.
    // Get the element from the DOM in which to display the list, this should be an ul or ol element.
    resultElement = document.getElementById('jobList');

	// Set the inner HTML
	resultElement.innerHTML = listItems;
}
page_init();
fill_jobs_list();
