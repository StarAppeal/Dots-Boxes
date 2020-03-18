let retractor = document.getElementById("retractor")
let users = document.getElementById("users")

retractor.addEventListener("mouseup", function(e) {
  users.classList.toggle("retracted")
})
