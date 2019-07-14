window.addEventListener('load', async e => {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('chatworker.js')
          .then(() => {
              
              console.log('service worker register')
          })
  }
})


let database  = firebase.database().ref(`/`);
let signUp = () => {
  let name = document.getElementById(`name`).value + `@gmail.com`;
  let password = document.getElementById(`password`).value;

  let userObj = {
    name,
    password
  };
  console.log(userObj)
  firebase.auth().createUserWithEmailAndPassword(userObj.name, userObj.password)
    .then(resolve => {
        userObj.id = resolve.user.uid
      database.child(`users/${resolve.user.uid}`).set(userObj);
      alert(`User Signup Succesfully`);
    })
    .catch(function(error) {
      alert(error.code);
      alert(error.message);
    });
};


let login = () => {
    let userName = document.getElementById(`name`).value+`@gmail.com`;
    let userPassword = document.getElementById(`password`).value;
  
    let user = {
      name : userName,
      password : userPassword
    };

    // console.log(user);
  
    firebase
      .auth().signInWithEmailAndPassword(user.name, user.password)
      .then(resolve => {
        // console.log(resolve.user.uid);
        database.child(`users/${resolve.user.uid}`).on(`value`, snap => {
          let obj = snap.val();
          obj.id = resolve.user.uid;
          localStorage.setItem(`CureentUser`, JSON.stringify(obj));
          window.location.href = `pages/home.html`
  
        });
      })
      .catch(error => {
          error.code
          alert(`Please Sign Up`)
      });
  };
  

