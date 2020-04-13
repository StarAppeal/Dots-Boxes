let retractor = document.getElementById("retractor")
let iconDlgOpener = document.getElementById("iconDlgOpener")
let iconSelector = document.getElementById("iconSelector")
let colorSelector = document.getElementById("colorSelector")
let modalBG = document.getElementById("modalBG")
let modalContainer = document.getElementById("modalContainer")
let iconList = document.getElementById("iconList")
let flipperList = document.getElementsByClassName("flipper")
let nextButtonList = document.getElementsByClassName("modal-button next")
let previousButtonList = document.getElementsByClassName("modal-button previous")
let penPresets: HTMLCollection = document.getElementById("penPicker").getElementsByClassName("pen-preset")
let colorPicker = <any>document.getElementById("colorPicker")

document.querySelector('#navigationMenu .plus').onclick = function() {
  zoomIn()
}
document.querySelector('#navigationMenu .minus').onclick = function() {
  zoomOut()
}

let iconModal = new Modal(modalContainer)

retractor.addEventListener("mouseup", function(e) {
  let usersHeader = document.getElementById("users")
  usersHeader.classList.toggle("retracted")
})

//next buttons
for (var i = 0; i < nextButtonList.length; i++) {
  nextButtonList[i].addEventListener("mouseup", function(e) {
    iconModal.next()
  })
}

//previous buttons
for (var i = 0; i < previousButtonList.length; i++) {
  previousButtonList[i].addEventListener("mouseup", function(e) {
    iconModal.previous()
  })
}

//flipper buttons
for (var i = 0; i < flipperList.length; i++) {
  flipperList[i].addEventListener("mouseup", function(e) {
    iconSelector.classList.toggle("flipped")
  })
}

//append selectable icons
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

let preset: any
for (preset of penPresets) {
  let color = '#' + preset.classList[preset.classList.length-1].substr(1)
  preset.style.borderColor = color
  preset.addEventListener("mouseup", function(e) {
    colorPicker.value = color
  })
}
