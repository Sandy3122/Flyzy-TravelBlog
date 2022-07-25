// let menu = document.querySelector('#menu-btn');
// let navbar = document.querySelector('.header .navbar');

// menu.onclick = () =>{
//    menu.classList.toggle('fa-times');
//    navbar.classList.toggle('active');
// };

// window.onscroll = () =>{
//    menu.classList.remove('fa-times');
//    navbar.classList.remove('active');
// };


// Login And Registration Page
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
