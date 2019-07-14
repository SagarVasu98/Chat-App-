let database = firebase.database().ref(`/`);

let loginUser = localStorage.getItem(`CureentUser`);
loginUser = JSON.parse(loginUser);
database.child(`users`).on(`child_added`, snap => {

  let data = snap.val();
  data.id = snap.key;
  // console.log(snap.val())

  if(loginUser.id === data.id){

  }
  else{
    
  let mainDiv = document.getElementById(`main`);
  let hr = document.createElement(`hr`);
  mainDiv.appendChild(hr);
  let div = document.createElement(`div`);
  div.setAttribute(`class`, `w3-cell-row`);

  let div1 = document.createElement(`div`);
  div1.setAttribute(`class`, `w3-cell`);
  div1.setAttribute(`style`, `width:30%`);
  let img = document.createElement(`img`);
  img.setAttribute(`src`, `../images/user.png`);
  img.setAttribute(`class`, `w3-circle`);
  img.setAttribute(`style`, `width:100%;border-radius:100%`);

  div1.appendChild(img);
  div.appendChild(div1);

  let div2 = document.createElement(`div`);
  div2.setAttribute(`class`, `w3-cell w3-container`);

  let h1 = document.createElement(`h4`);
  h1.innerHTML =  data.name.slice(0,-10);
  
  let chatNow = document.createElement(`input`);
  chatNow.setAttribute(`value`,`Chat Now`)
  chatNow.setAttribute(`type`,`button`)
  chatNow.setAttribute(`id`,data.id)
  chatNow.setAttribute(`style`,`width: 130px; height: 36px;background-color: #316DC3;color: white;font-weight: 600px;cursor: pointer;font-size: 18px;border: 2px solid #316DC3; margin-bottom: 30px;`)
  
  div2.appendChild(h1);
  div2.appendChild(chatNow);
  mainDiv.appendChild(div1);
  mainDiv.appendChild(div2);
  mainDiv.appendChild(hr);

  chatNow.addEventListener(`click`,function(){
      window.location.href = `chat.html`
      database.child(`users/${this.id}`).on(`value`,(newSnap)=>{
        let obj = {
          name : newSnap.val().name.slice(0,-10),
          id : this.id
        }
        localStorage.setItem(`userId`,JSON.stringify(obj))

      })
      
  })
    
  }

});


// logout



logout = () => {
  firebase.auth().signOut().then(res => {
      console.log(res, `signout`);
      localStorage.removeItem(`CureentUser`);
      localStorage.removeItem(`userId`);
      window.location.href = `../index.html`;
  }),
  err => {
    console.log(err, `signout error`);
  };
};

  // prime Number
  // function isPrime(num) {
  //   var sqrtnum=Math.floor(Math.sqrt(num));
  
  //     var prime = num != 1;
  //     for(var i=2; i<sqrtnum+1; i++) { // sqrtnum+1
  //         if(num % i == 0) {
  //               console.log(`i1`,i)
  //               prime = false;
  //                break;
  //         }
  //     }
  //     return prime;
  // }
  // console.log(isPrime(7))


  // Factorial

  // var number = Number(prompt(`Enter an Number for Factorial?`));

  // var count = 1;

  // for(var i =1; i <= number; i++){
  //   count = count * i;
  //   console.log(`inside Count ==>`,count)
  // }
  // console.log(`outside Count ==>`,count)