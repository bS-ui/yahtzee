let userRoll;

const diceDisplayEl = document.querySelectorAll('.dice-display')

console.log(diceDisplayEl)
doRoll = () => {
  userRoll.forEach((roll,idx) => userRoll[idx] = Math.floor(Math.random() * 5))
}
updateRollElement = () => {
  diceDisplayEl.forEach((diceDisplay,idx) => {
    if (userRoll[idx] == '0') diceDisplay.style.backgroundImage = "url('./assets/images/dice1.png')"
    else if (userRoll[idx] == '1') diceDisplay.style.backgroundImage = "url('./assets/images/dice2.png')"
    else if (userRoll[idx] == '2') diceDisplay.style.backgroundImage = "url('./assets/images/dice3.png')"
    else if (userRoll[idx] == '3') diceDisplay.style.backgroundImage = "url('./assets/images/dice4.png')"
    else if (userRoll[idx] == '4') diceDisplay.style.backgroundImage = "url('./assets/images/dice5.png')"
    else if (userRoll[idx] == '5') diceDisplay.style.backgroundImage = "url('./assets/images/dice6.png')"
  })
}
init = () => {
  userRoll = [null,null,null,null,null]
}

init()
doRoll()
updateRollElement()
