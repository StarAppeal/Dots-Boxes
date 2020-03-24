class Modal {
  stepIndex: number
  stepElements: any
  maxSteps: number
  modalParent: HTMLElement
  constructor(modalParent: HTMLElement) {
    this.stepIndex = 0
    this.stepElements = modalParent.getElementsByClassName("modal")
    this.maxSteps = this.stepElements.length
    this.modalParent = modalParent
  }

  next() {
    if (this.stepIndex == 0) {
      this.modalParent.classList.add("opened")
    } else {
      this.stepElements[this.stepIndex-1].classList.remove("active")
    }

    if (this.stepIndex == this.maxSteps) {
      this.reset()
    } else {
      this.stepElements[this.stepIndex].classList.add("active")
      this.stepIndex++
    }
  }

  previous() {
    this.stepIndex--
    if (this.stepIndex <= 0) {
      this.reset()
    } else {
      this.stepElements[this.stepIndex-1].classList.add("active")
      this.stepElements[this.stepIndex].classList.remove("active")

    }
  }

  reset() {
    this.stepIndex = 0
    this.modalParent.classList.remove("opened")
    for (let stepElement of this.stepElements) {
      stepElement.classList.remove("active")
    }
  }
}
