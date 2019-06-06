// Deals with connecting the View and UCPC.js and also handles button click events and some form controls
class Controller {
  constructor () {
    this.modalActive = false
    this.currentModal = ''
  }

  // Deals with showing and hiding the modals on the website
  showModal (whichModal) {
    this.currentModal = whichModal
    document.getElementById(whichModal).style.display = 'block'
    this.modalActive = true
  }

  hideModal () {
    document.getElementById(this.currentModal).style.display = 'none'
    this.modalActive = false
  }

  // Button Click Events
  onClickAW () {
    document.getElementById('AW__label').value = document.getElementById('AW__label--total').value
    this.hideModal()
  }

  onClickUCW () {
    document.getElementById('UCW__label').value = document.getElementById('UCW__label--total').value
    this.hideModal()
  }

  onClickUUCP () {
    ucp.setAW(parseInt(document.getElementById('AW__label').value))
    ucp.setUCW(parseInt(document.getElementById('UCW__label').value))
    document.getElementById('UUCP__label').value = ucp.calculateUUCP()
  }

  onClickTCF () {
    ucp.setTFDirect(parseInt(document.getElementById('TF__label').value))
    document.getElementById('TCF__label').value = ucp.calculateTCF()
  }

  onClickECF () { document.getElementById('ECF__label').value = ucp.calculateECF() }

  onClickTF () {
    let values = []
    for (let index = 1; index <= 13; index++) {
      values.push(parseInt(document.getElementById('TF__select--' + index).value))
    }
    ucp.setTF(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12])
    document.getElementById('TF__label').value = ucp.getTF()
    document.getElementById('TF__label--modal').value = ucp.getTF()
  }

  onClickEF () {
    let values = []
    for (let index = 1; index <= 8; index++) {
      values.push(parseInt(document.getElementById('EF__select--' + index).value))
    }
    ucp.setEF(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7])
    document.getElementById('EF__label').value = ucp.getEF()
    document.getElementById('EF__label--modal').value = ucp.getEF()
  }

  onClickUCP () {
    document.getElementById('UCP__label').value = ucp.calculateUCP()
    document.getElementById('factors__label').value = ucp.getFactors()
    document.getElementById('EE__label').value = ucp.calculateEE()
    document.getElementById('months__label').value = ucp.calculateMonths()
    console.log('The Hours value is: ' + ucp.calculateHours())
  }

  // Form Controls
  updateTotal (sectionName) {
    document.getElementById(sectionName + '__label--total').value = this.getAllFromColumn(sectionName + '__table', 1)
  }

  clearInputFields (sectionName) {
    let weight = 'input[name="' + sectionName + '__weight"]:checked'
    document.getElementById(sectionName + '__label--name').value = ''
    document.querySelector(weight).checked = false
  }

  resetForm (whichForm) {
    document.getElementById(whichForm).reset()
    this.hideModal()
  }

  insertRow (tableID, rowData) {
    var table = document.getElementById(tableID)
    var row = table.insertRow(-1)
    for (let index = 0; index < rowData.length; index++) {
      const element = rowData[index]
      let cell = row.insertCell(index)
      cell.innerHTML = element
    }
  }

  addHandler (sectionName) {
    var rowData = []
    let weight = 'input[name="' + sectionName + '__weight"]:checked'
    rowData.push(document.getElementById(sectionName + '__label--name').value)
    rowData.push(document.querySelector(weight).value)
    this.insertRow(sectionName + '__table', rowData)
    this.updateTotal(sectionName)
    this.clearInputFields(sectionName)
  }

  deleteTableRow (tableID, whichRow = -1) {
    var table = document.getElementById(tableID)
    if (table.rows.length > 1) {
      table.deleteRow(whichRow)
      this.updateTotal(tableID.substring(0, 3))
    }
  }

  getAllFromColumn (tableID, columnID) {
    let table = document.getElementById(tableID)
    var sum = 0
    for (let index = 0; index < table.rows.length; index++) {
      switch (tableID) {
        case 'AW__table':
        default:
          switch (table.rows[index].cells[columnID].innerHTML) {
            case 'Simple':
              sum += 1
              break
            case 'Average':
              sum += 2
              break
            case 'Complex':
              sum += 3
              break
            default:
              sum += 0
              break
          }
          break
        case 'UCW__table':
          switch (table.rows[index].cells[columnID].innerHTML) {
            case 'Simple':
              sum += 5
              break
            case 'Average':
              sum += 10
              break
            case 'Complex':
              sum += 15
              break
            default:
              sum += 0
              break
          }
          break
      }
    }
    return sum
  }
}
