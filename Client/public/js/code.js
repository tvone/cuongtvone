var loginBtn = document.getElementById('signin');
var modal = document.getElementById('my-login');
var close_modal = document.getElementById('close');
loginBtn.onclick = function(){
   modal.style.display = 'block';
}
close_modal.onclick = function(){
   modal.style.display ='none'
}

window.onclick = function(event){
   if(event.target === modal){
      modal.style.display = 'none'
   }
}
// Collection Film :
window.onclick = function(event){
   if(event.target === document.getElementById('collection-film')){
      document.getElementById('collection-film').style.display = 'none'
   }
}


var loginForm = document.querySelector('form.login');
var signupForm = document.querySelector('form.signup');
var btnLogin = document.querySelector('label.login');
var btnSignup = document.querySelector('label.signup');
var btnSignupLink = document.querySelector('.signup-link a')
var textLogin = document.querySelector('.title-text .login')
var textSignup = document.querySelector('.title-text .signup')

btnSignup.onclick = ()=>{
   loginForm.style.marginLeft = '-50%'
   textLogin.style.marginLeft = '-50%'
}
btnLogin.onclick = ()=>{
   loginForm.style.marginLeft = '0%',
   textLogin.style.marginLeft = '0%'
}
btnSignupLink.onclick = ()=>{
  btnSignup.click();
}

 
