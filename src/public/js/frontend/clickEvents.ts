let retractor = document.getElementById("retractor")
let iconDlgOpener = document.getElementById("iconDlgOpener")
let iconSelector = document.getElementById("iconSelector")
let iconList = document.getElementById("iconList")
let flipperList = document.getElementsByClassName("flipper")
let selectorList = document.getElementsByClassName("selector")

retractor.addEventListener("mouseup", function(e) {
  let usersHeader = document.getElementById("users")
  usersHeader.classList.toggle("retracted")
})

iconDlgOpener.addEventListener("mouseup", function(e) {
  iconSelector.classList.toggle("inactive")
})

for (var i = 0; i < selectorList.length; i++) {
  selectorList[i].addEventListener("mouseup", function(e) {
    iconSelector.classList.toggle("inactive")
  })
}

for (var i = 0; i < flipperList.length; i++) {
  flipperList[i].addEventListener("mouseup", function(e) {
    iconSelector.firstElementChild.classList.toggle("flipped")
  })
}

let iconIndex = 0
while (imageExists("/images/points/"+iconIndex+".png")) {
  let url = "url('/images/points/"+iconIndex+".png')"
  let iconWrapper = document.createElement("div")
  iconWrapper.classList.add("icon-wrapper")
  iconWrapper.addEventListener("mouseup", function(e) {
    selectIcon(this)
  })
  let iconMarker = document.createElement("div")
  iconMarker.classList.add("icon-marker")
  let icon = document.createElement("div")
  icon.classList.add("icon")
  icon.style.backgroundImage = url
  iconWrapper.appendChild(icon)
  iconWrapper.appendChild(iconMarker)
  iconList.appendChild(iconWrapper)
  iconIndex++
}

function selectIcon(icon: HTMLDivElement) {
  let selectedIconWrapper = document.getElementsByClassName("icon-wrapper selected")[0]
  if (selectedIconWrapper != undefined && selectedIconWrapper != icon) {
    selectedIconWrapper.classList.remove("selected")
  }
  icon.classList.toggle("selected")
}
