let frontButtonArrow = document.querySelector(".front-button-array");
let frontButton = document.querySelector(".front-button");

//eventListeners
frontButton.addEventListener("mouseover", function(e) {
  frontButtonArrow.innerHTML = "&darr;";
});
frontButton.addEventListener("mouseout", function(e) {
  frontButtonArrow.innerHTML = "&rarr;";
});
