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




function signUp() {
    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value.trim()
    let confirmpassword = document.getElementById('confirmpassword').value.trim()
    let fullname = document.getElementById('fullname').value.trim()


    if (!email || !password || !confirmpassword || !fullname) {
        alert('all fields are mandatory')

    } else if (password !== confirmpassword) {
        alert('passwords do not match')

    } else {
        setLoadingState(true)

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                user.updateProfile({
                    displayName: fullname,
                }).then(() => {
                    console.log(user);
                    alert('sign up successful')
                    setLoadingState(false)
                    // window.location.href = '../ecom-app/pages/signin.html'
                }).catch((error) => {
                    console.log(user);
                    alert('sign up successful, without updating users name')
                    setLoadingState(false)
                    // window.location.href = '../ecom-app/pages/signin.html'
                });



                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage)
                setLoadingState(false)
                // ..
            });
    }




}

function setLoadingState(bool) {
    button.innerHTML = bool ? 'loading...' : 'sign up'
    button.disabled = bool
}




// const firebase = {
//     auth: () => {

//         return {

//             createUserWithEmailAndPassword: (email, password) => {

//             }
//         }
//     }
// }