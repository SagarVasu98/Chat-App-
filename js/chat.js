let loginUser = localStorage.getItem(`CureentUser`);
loginUser = JSON.parse(loginUser);

let current = localStorage.getItem(`userId`);
current = JSON.parse(current);
let database = firebase.database().ref(`/`);
var flag = `true`

let send = () => {

  let input = document.getElementById(`text`).value;

  if(input  <= 0){
    alert(`Please Type Something!!!`)

  }
  else{
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime)
  
      let message = {
        text: input,
        sender : true,
        time : strTime      
      };
       let message1 = {
        text: input,
        senderId : current.id,
        time : strTime      
           
  
      };
  
      database.child(`users/${current.id}/${loginUser.id}`).push(message);
      database.child(`users/${loginUser.id}/${current.id}`).push(message1);
      document.getElementById(`text`).value = ``;
  }
 
  };
  document.getElementById(`text`).value=``;

document.getElementById(`currnet`).innerHTML = `${loginUser.name.slice(0, -10)} is messaging to ${current.name} `;





// database.child(`users/${loginUser.id}/${current.id}`).on(`child_added`, snap1 => {
//   let chatBox = document.getElementById(`chatBox`);
//   let div = document.createElement(`div`);
//   div.setAttribute(`class`, `talk-bubble`);
//   let div2 = document.createElement(`div`);
//   div2.setAttribute(`class`, `talktext`);
//   let p = document.createElement(`p`);
//   div2.appendChild(p);
//   div.appendChild(div2);
//   chatBox.appendChild(div);
// // if(){

// // }
//   p.innerHTML = snap1.val().text;

// })



database.child(`users/${current.id}/${loginUser.id}`).on(`child_added`, snap1 => {
  let chatBox = document.getElementById(`chatBox`);
  let div = document.createElement(`div`);
  div.setAttribute(`class`, `talk-bubble`);
  let div2 = document.createElement(`div`);
  div2.setAttribute(`class`, `talktext`);
  let p = document.createElement(`p`);
  let br = document.createElement(`br`);
  let span = document.createElement(`span`);
  div2.appendChild(p);
  div2.appendChild(br);
  div2.appendChild(span)
  div.appendChild(div2);
  chatBox.appendChild(div);
  if(snap1.val().sender){
    chatBox.style.cssFloat = `right` 
    div.style.cssFloat = `right`
    p.innerHTML = snap1.val().text;
    span.innerHTML = snap1.val().time
    span.style.cssFloat = `left`
    span.style.paddingBottom = `10px`
  }

  if(!snap1.val().sender){
    p.innerHTML = snap1.val().text;
    span.innerHTML = snap1.val().time
    span.innerHTML = snap1.val().time

    div.style.backgroundColor = `lightpink`
    chatBox.style.cssFloat = `left` 
    div.style.cssFloat = `left`
    span.style.cssFloat = `left`
    span.style.paddingBottom = `10px`


  }
  

})
