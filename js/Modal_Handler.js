class Modal_Handler {
  constructor () {
    this.modalActive = false
    this.currentModal = ''
  }

  showModal (whichModal) {
    this.currentModal = whichModal
    document.getElementById(whichModal).style.display = 'block'
    this.modalActive = true
  }

  hideModal () {
    document.getElementById(this.currentModal).style.display = 'none'
    this.modalActive = false
  }
}
