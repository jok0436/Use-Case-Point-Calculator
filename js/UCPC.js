class UCP {
  constructor () {
    this.UAW = 0
    this.UCW = 0
    this.TCF = 0
    this.ECF = 0
    this.UUCP = 0
    this.finalTCF = 0
    this.finalECF = 0
    this.UCP = 0
    this.EF = 0
    this.personHRS = 0
  }
  okUAW (newUAW) {}
  okUCW (newUCW) {}
  okUUCP () {}
  okTFW (t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12, t13) {}
  okTCF () {}
  okEFW (e01, e02, e03, e04, e05, e06, e07, e08) {}
  okEF () {}
  sumUUCP () {}
  calcTCF () {}
  calcECF () {}
  calcUCP () {}
  calcPersonHrs () {}
}

class UAW {
  constructor () {
    this.name = ''
    this.weight = 0
  }
}

class UAC {
  constructor () {
    this.name = ''
    this.weight = 0
  }
}
