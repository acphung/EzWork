const userRef = firebase.database().ref('users');

let user, email, emailFixed;
let userName, userLocation, userAbout;

window.addEventListener('load', () => {
    refreshProfile();
});

function getUserInfo() {
    user = firebase.auth().currentUser;

    if (user) {
        email = user.email;
        emailFixed = email.replace('.', '(').toLowerCase();
    } else {
        email = null;
        emailFixed = null;
    }
    return user;
}

function refreshProfile() {
    if (getUserInfo()) {
        getProfile().then((success) => {
            alert(success);
            displayProfile();
        }).catch((error) => {
            alert(error);
        });
    } else {
        alert("user is not logged in");
    }
}

function displayProfile() {
    // console.log("displaying name: " + userName);
    // console.log("displaying location: " + userLocation);
    // console.log("displaying about: " + userAbout);
    displayName();
    displayLocation();
    displayAbout();
}

// I am assuming the 2nd element in the div is the <p> tag
function displayName() {
    let name = document.getElementById("Name");
    let textRef = name.children[1];
    setFieldText(userName, textRef);
}

function displayLocation() {
    let location = document.getElementById("City");
    let textRef = name.children[1];
    setFieldText(userLocation, textRef);

}

function displayAbout() {
    let name = document.getElementById("About");
    let textRef = name.children[1];
    setFieldText(userAbout, textRef);

}

function setFieldText(field, textRef) {
    if (field) {
        textRef.textContent = field;
    } else {
        textRef.textContent = "N/A";
    }
}

function getProfile() {
    return new Promise ((resolve, reject) => {
        userRef.child(emailFixed).once('value').then(function(snapshot) {
            userData = snapshot.val();
            userName = userData.name;
            userLocation = userData.location;
            userAbout = userData.about;
            resolve("Profile Data Retrieved!");
        }).catch((error) => {
            reject("Cannot Retrieve Profile: " + error);
        });
    });
}

function updateName() {
    // Need to grab value from webpage.
    // For the mean time this is a placeholder.
    let newName = "temp";
    db.ref('/users/' + emailFixed).update({name: newName});
    refreshProfile();
}

function updateLocation() {
    // Need to grab value from webpage.
    // For the mean time this is a placeholder.
    let newLocation = "temp";
    db.ref('/users/' + emailFixed).update({location: newLocation});
    refreshProfile();
}

function updateAbout() {
    // Need to grab value from webpage.
    // For the mean time this is a placeholder.
    let newAbout = "temp";
    db.ref('/users/' + emailFixed).update({about: newAbout});
    refreshProfile();
}
