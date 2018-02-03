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
                // ********* ADD CODE *********
                //alert("Login Successful!");
                // login_display();
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
        document.getElementById("welcome_guest").style.display = "none";
        document.getElementById("welcome_user_text").innerHTML = "Hello " +
                firebase.auth().currentUser.email;
        document.getElementById("welcome_user").style.display = "block";
    } else {
        document.getElementById("welcome_guest").style.display = "block";
        document.getElementById("welcome_user").style.display = "none";
    }
});


function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
        e.style.display = 'none';
   else
        e.style.display = 'block';
}

function page_init(){
	var array = ['Job 1', 'Job 2', 'Job 3', 'Job 4', 'Job 5', 'Job 6', 'Job 7', 'Job 8', 'Job 9', 'Job 9', 'Job 10', 'Job 11', 'Job 12', 'Job 13', 'Job 14', 'Job 15', 'Job 16', 'Job 17'],
    // Reduce will iterate over all the array items and returns a single value.
    listItems = array.reduce((result, item) => {
    // Add a string to the result for the current item. This syntax is using template literals.
    result += `<li><p>${item}</p></li>`;
    // Always return the result in the reduce callback, it will be the value or result in the next iteration.
    return result;
  }, ''); // The '' is an empty string, it is the initial value result.
  // Get the element from the DOM in which to display the list, this should be an ul or ol element.
  resultElement = document.getElementById('jobList');

// Set the inner HTML
resultElement.innerHTML = listItems;
}
page_init();
