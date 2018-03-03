const userRef = firebase.database().ref('users');
const jobRef = firebase.database().ref('jobs');
const appRef = firebase.database().ref('applications');

let user, email, emailFixed;
let userName, userLocation, userAbout;
// Currently Not Implemented
let userResume;

setTimeout(loadUserInfo, 1500);

// Assuming I can get the job id.
function applyToJob (jobid) {
    const jobappRef = jobRef.child(jobid + "/applications");
    const userappRef = userRef.child(emailFixed + "/applications");

    
    let appData = {
        name: userName,
        location: userLocation,
        about: userAbout
        // Currently Not Implemented
        // resume: userResume
    }
    let newRef = appRef.push(appData);
    let newRefKey = newRef.key;
    jobappRef.push(newRefKey);
    userappRef.push(newRefKey);
}


function loadUserInfo() {
    if (getUserInfo()) {
        getProfile().then((success) => {
            alert(success);
        }).catch((error) => {
            alert(error);
        });
    } else {
        alert("user is not logged in");
    }
}

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

function getProfile() {
    return new Promise ((resolve, reject) => {
        userRef.child(emailFixed).once('value').then(function(snapshot) {
            let userData = snapshot.val();
            userName = userData.name;
            userLocation = userData.location;
            userAbout = userData.about;
            // Currently Not Implemented
            // userResume = userData.resume;
            resolve("Got User Info!");
        }).catch((error) => {
            reject("Cannot Retrieve Profile: " + error);
        });
    });
}
