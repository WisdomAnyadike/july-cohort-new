const firebaseConfig = {
    apiKey: "AIzaSyBdldmLZPlGIxUtUmJkkSpsFixhlPLut_Q",
    authDomain: "julyapp-2ab24.firebaseapp.com",
    projectId: "julyapp-2ab24",
    storageBucket: "julyapp-2ab24.firebasestorage.app",
    messagingSenderId: "883520818669",
    appId: "1:883520818669:web:6f41f62e9441082a25abe4"
};

console.log(firebase);


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function checkUserAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            console.log(user);
            navName.innerHTML = user.displayName ? user.displayName : 'user'
            // ...
        } else {
            window.location.href = '../pages/signin.html'
        }
    });

}

checkUserAuth()

function logOut() {
    let isConfirmed = window.confirm('are you sure you want to logout?')
    console.log(isConfirmed);

    if (isConfirmed) {
        auth.signOut().then(() => {
            window.location.href = '../pages/signin.html'
        }).catch((error) => {
            alert(error.message)
        });
    }



}



// if (false) {
//     console.log('hmm');
// } else if (true) {
//     console.log('js ooo');
// }  else if (true) {
//     console.log('js3 ooo');
// }

// else {
//     console.log('wow');
// }