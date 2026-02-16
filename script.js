(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("fitnessForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(function() {
      document.getElementById("successMsg").innerText =
        "Application submitted successfully!";
      document.getElementById("fitnessForm").reset();
    }, function(error) {
      alert("Failed to send. Please try again.");
      console.log(error);
    });
});
