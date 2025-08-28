const firebaseConfig = {
    apiKey: "AIzaSyBdldmLZPlGIxUtUmJkkSpsFixhlPLut_Q",
    authDomain: "julyapp-2ab24.firebaseapp.com",
    databaseURL: "https://julyapp-2ab24-default-rtdb.firebaseio.com",
    projectId: "julyapp-2ab24",
    storageBucket: "julyapp-2ab24.firebasestorage.app",
    messagingSenderId: "883520818669",
    appId: "1:883520818669:web:6f41f62e9441082a25abe4"
};

console.log(firebase);


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
let chatIndex



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


function sendMessage() {
    if (!messageInput.value.trim()) {
        alert('please attach a message')
        return
    }

    if (isNaN(chatIndex) || chatIndex < 0) {
        alert('cant sent message at the moment')
        return
    }



    let user = auth.currentUser

    database.ref(`Chats/${chatIndex}`).set({
        id: user.uid,
        sender: user.displayName,
        message: messageInput.value.trim(),
        time: new Date().toLocaleTimeString()
    }).then(() => {

        messageInput.value = ''
    }).catch((err) => {
        alert(err.message)
    })


}


function displayMessages() {
    messages.innerHTML = 'loading...'
    var starCountRef = database.ref('Chats');

    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val() || [];
        chatIndex = data.length

        messages.innerHTML = ''

        if (data.length === 0) {
            messages.innerHTML = 'no messages atm ..'
            return
        }

        data.forEach((element, i) => {
            let designClass = auth.currentUser.uid === element.id ? 'outgoing' : 'incoming'
            messages.innerHTML += ` <div class="msg ${designClass}">
            <div class="bubble"> ${element.message}</div>
            <div class="meta">${element.sender}</div>
            <div class="meta">${element.time}</div>
        </div> `

        });

    });

}

displayMessages()