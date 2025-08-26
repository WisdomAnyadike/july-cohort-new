// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdldmLZPlGIxUtUmJkkSpsFixhlPLut_Q",
    authDomain: "julyapp-2ab24.firebaseapp.com",
    projectId: "julyapp-2ab24",
    storageBucket: "julyapp-2ab24.firebasestorage.app",
    messagingSenderId: "883520818669",
    appId: "1:883520818669:web:6f41f62e9441082a25abe4"
};

console.log(firebase);


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function signIn() {
    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value.trim()

    if (!email || !password) {
        alert('all fields are mandatory')
    } else {
        setLoadingState(true)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                alert('login successful')
                window.location.href = '../pages/dashboard.html'
                setLoadingState(false)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                setLoadingState(false)
            });
    }



}

function setLoadingState(bool) {
    button.innerHTML = bool ? 'loading...' : 'sign up'
    button.disabled = bool
}
