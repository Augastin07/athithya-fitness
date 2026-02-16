// Smooth scroll for apply button
document.querySelector(".btn").addEventListener("click", function(e){
  e.preventDefault();
  document.querySelector("#apply").scrollIntoView({
    behavior: "smooth"
  });
});
