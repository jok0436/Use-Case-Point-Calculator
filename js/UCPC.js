/*
Created by Josiah Kerr
An application meant to reproduce this formula : https://en.wikipedia.org/wiki/Use_Case_Points
*/

class UCP {
  constructor () {
    this.AW = 0 // Actor Weight
    this.UCW = 0 // Use Case Weight
    this.TF = 0 // Technical Factor total
    this.TCF = 0 // Technical Complexity Factor
    this.EF = 0 // Environmental Factor total
    this.ECF = 0 // Enironmental Complexity Factor
    this.factors = 0 // How many EF's are above or below a certain point
    this.UUCP = 0 // Unadjusted Use Case Points
    this.UCP = 0 // Use Case Points
    this.EE = 0 // Estimated effort (Man Hours to Use Case Points Ratio)
    this.hours = 0 // How many Man-Hours the project would take to complete
    this.months = 0 // How many Man-months the project would take to complete
  }

  setAW (newAW) {
    this.AW = newAW
    return this.AW
  }

  setUCW (newUCW) {
    this.UCW = newUCW
    return this.UCW
  }

  // Takes in 13 Tecnical Factors and adds them to a total, they all have seperate weights which have
  // been hard-coded into the system.. mostly becuase they are unlikely to change
  setTF (t01, t02, t03, t04, t05, t06, t07, t08, t09, t10, t11, t12, t13) {
    this.TF = (t01 * 2) + t02 + t03 + t04 + t05 + (t06 * 0.5) + (t07 * 0.5) + (t08 * 2) + t09 + t10 + t11 + t12 + t13
    return this.TF
  }

  setTFDirect (newTF) {
    this.TF = newTF
    return this.TF
  }

  getTF () {
    return this.TF
  }

  // Calculates Tecnical Complexity Factor based off of a formula of ".06 + (.01 * Technical Factor)"
  calculateTCF () {
    this.TCF = 0.6 + (0.01 * this.TF)
    return this.TCF
  }

  // Takes in 8 Environmental Factos and Totals them, also does some checking for the EE value, this code looks weird becuase the
  // environmental factors are not in an array like they should be and i had to hard code it like this, the EF calculation is hard-coded too
  // with the weights becuase they are unlikely to change and also becuase i cannot change the input parameters of the method (becuase im doing this for a school project)
  setEF (e01, e02, e03, e04, e05, e06, e07, e08) {
    if (e01 < 3) { this.addFactor() }
    if (e02 < 3) { this.addFactor() }
    if (e03 < 3) { this.addFactor() }
    if (e04 < 3) { this.addFactor() }
    if (e05 < 3) { this.addFactor() }
    if (e06 < 3) { this.addFactor() }
    if (e07 > 3) { this.addFactor() }
    if (e08 > 3) { this.addFactor() }
    this.EF = (e01 * 1.5) + (e02 * 0.5) + (e03 * 1) + (e04 * 0.5) + (e05 * 1) + (e06 * 2) + (e07 * -1) + (e08 * -1)
    return this.EF
  }

  setEFDirect (newEF) {
    this.EF = newEF
    return this.EF
  }

  getEF () {
    return this.EF
  }

  // Calculates Environmental Complexity Factor based off of a formula of "1.4 + (-0.03 * Environmental Factor)"
  calculateECF () {
    this.ECF = 1.4 + (-0.03 * this.EF)
    return this.ECF
  }

  addFactor () {
    this.factors++
    return this.factors
  }

  getFactors () {
    return this.factors
  }

  calculateUUCP () {
    this.UUCP = this.AW + this.UCW
    return this.UUCP
  }

  calculateUCP () {
    this.UCP = this.UUCP * this.TCF * this.ECF
    return this.UCP
  }

  // Calculates the man-hours to UCP ratio based on the count of factors, (some above 3 and some below 3.. refer to the wiki..)
  // this ratio is used to determine the total hours the project needs, its UCP * this value to get the total hours
  calculateEE () {
    if (this.factors <= 2) {
      this.EE = 20
    } else if (this.factors <= 4) {
      this.EE = 28
    } else {
      this.EE = 36
    }
    return this.EE
  }

  calculateHours () {
    this.hours = this.UCP * this.EE
    return this.hours
  }

  calculateMonths () {
    this.months = this.UCP * this.EE * 0.00136986
    return this.months
  }
}
