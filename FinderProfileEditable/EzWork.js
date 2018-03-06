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
}

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
        e.style.display = 'none';
   else
        e.style.display = 'block';
}


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
page_init();
/*
		function addTextBox() {
			var box4 = document.getElementById("box4");
			box4.style.display = "inline";
		}
		function hideTextBox() {
			var box4 = document.getElementById("box4");
			box4.style.display = "none";
		}
		
		function addTextBox2() {
			var box5 = document.getElementById("box5");
			box5.style.display = "inline";
		}
		function hideTextBox2(){
			var box5 = document.getElementById("box5");
			box5.style.display = "none";
		}
		function addTextBox3() {
			var box6 = document.getElementById("box6");
			box6.style.display = "inline";
		}
		function hideTextBox3() {
			var box6 = document.getElementById("box6");
			box6.style.display = "none";
		}
		
		var button = document.getElementById("edit");
		var d2 = document.getElementById("d3");
		function showbutt() {
			button.style.display="none";
			d2.style.display="inline";
		}

		function showedit() {
			button.style.display="inline-block";
			d2.style.display="none";
		}
		
		var button2 = document.getElementById("edit2");
		var d4 = document.getElementById("d4");
		function showbutt2() {
			button2.style.display="none";
			d4.style.display="inline";
		}

		function showedit2() {
			button2.style.display="inline-block";
			d4.style.display="none";
		}
		
		var button3 = document.getElementById("edit3");
		var d5 = document.getElementById("d5");
		function showbutt3() {
			button3.style.display="none";
			d5.style.display="inline";
		}

		function showedit3() {
			button3.style.display="inline-block";
			d5.style.display="none";
		}
		
		onFileInputChange = function() {
			var img = document.querySelector('.upload');
			var file = document.querySelector('input[type=file]').files[0]
			var reader = new FileReader();
	
			reader.addEventListener("load", function (){
			img.src = reader.result;
			}, false);
	
			if (file){
				reader.readAsDataURL(file);
			};
		}
		*/