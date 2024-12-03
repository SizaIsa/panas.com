const titulo = document.querySelector("#titulo");
const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const text1 = document.querySelector("#text1");
const text2 = document.querySelector("#text2");

 window.addEventListener("scroll", () =>{

let scroll = window.scrollY;

titulo.style.left = scroll* 1 + "px";
img1.style.left = scroll* -1 + "px";
img2.style.left = scroll* -0.1 + "px";
text1.style.left = scroll* 1 + "px";
text2.style.left = scroll* -0.5 + "px";





 })

