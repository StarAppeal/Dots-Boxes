let retractor = document.getElementById("retractor")

retractor.addEventListener("mouseup", function(e) {
  let usersEl = document.getElementById("users")
  usersEl.classList.toggle("retracted")
})
