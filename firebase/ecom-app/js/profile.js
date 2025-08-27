const firebaseConfig = {
    apiKey: "AIzaSyBdldmLZPlGIxUtUmJkkSpsFixhlPLut_Q",
    authDomain: "julyapp-2ab24.firebaseapp.com",
    projectId: "julyapp-2ab24",
    storageBucket: "julyapp-2ab24.firebasestorage.app",
    messagingSenderId: "883520818669",
    appId: "1:883520818669:web:6f41f62e9441082a25abe4"
};




const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


function checkUserAuth() {
    modal2.style.display = 'flex'


    auth.onAuthStateChanged((user) => {
        if (user) {
            modal2.style.display = 'none'
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            console.log(user);
            avatarPreview.innerHTML = user.photoURL ? `<img src="${user.photoURL}" style="width:100%; height:100%;" />` : `<div class="avatar-letter"> ${user.displayName[0] || 'U'}</div>`
            fullname.value = user.displayName || 'User'
            userShort.innerHTML = user.displayName || 'User'
            // ...
        } else {
            modal2.style.display = 'flex'
            window.location.href = '../pages/signin.html'
        }
    });

}

checkUserAuth()


function updatePhoto(ev) {
    let file = ev.target.files[0]
    console.log(file);

    if (!file) {
        alert('please attach a file')
        return
    }

    let formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'julyapp')


    fetch('https://api.cloudinary.com/v1_1/anyacodes/image/upload', {
        method: 'POST',
        body: formData
    }).then((res) => { return res.json() }).then((data) => {
        console.log(data);
        const user = firebase.auth().currentUser;

        user.updateProfile({
            photoURL: data.secure_url
        }).then(() => {
            alert('success')
            checkUserAuth()
        }).catch((error) => {
            alert(`an error occured while updating photo: ${error.message}`)
        });
    }).catch((err) => {
        alert(err.message)
    })



}