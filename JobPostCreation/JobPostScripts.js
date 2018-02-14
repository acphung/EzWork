function logout() {
    firebase.auth().signOut();
	window.location.href = "../Main/EzWork2.html";
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

