let userRoll = [];
let keepers = [];
let rollCount = 0
let score = 0

//r ===============================================================================

const diceDisplayEl = document.querySelectorAll('.dice-display')
const keeperDisplayEl = document.querySelectorAll('.keeper-dice')
const rollButtonEl = document.querySelector('.roll-button')
const rollCountEl = document.querySelector('.roll-count')
const scoreTextEls = document.querySelectorAll('.score-text')
const scoreNumberEls = document.querySelectorAll('.score-number')

//o ===============================================================================

diceDisplayEl.forEach(diceDisplay => {
  diceDisplay.addEventListener('click', handleDiceDisplayClick)
})

keeperDisplayEl.forEach(keeperDisplay => {
  keeperDisplay.addEventListener('click', handleKeeperDisplayClick)
})

rollButtonEl.addEventListener('click', handleRollBtnClick)

//y ===============================================================================

function handleDiceDisplayClick(evt) {
  let clickIdx = evt.target.id.substring(1)
  if (userRoll[clickIdx] !== null) {
    keepers[clickIdx] = Number((userRoll.splice(clickIdx,1,null)))
    console.log(userRoll)
    console.log(keepers)
    updateDisplays()
    checkForScore()
  }
}

function handleKeeperDisplayClick(evt) {
  let clickIdx = evt.target.id.substring(1)
  if (keepers[clickIdx] !== null) {
    userRoll[clickIdx] = Number((keepers.splice(clickIdx,1,null)))
    console.log(userRoll)
    console.log(keepers)
    updateDisplays()
    checkForScore()
  }
}

function handleRollBtnClick() {
  if (rollCount !== 3) {
    doRoll()
    console.log(userRoll)
    updateDisplays()
    checkForScore()
  }
}

//g ===============================================================================

doRoll = () => {
  userRoll.forEach((roll,idx) => {
    if (rollCount > 0 && userRoll[idx] !== null) {
      userRoll[idx] = Math.floor(Math.random() * 6)
    }
    else if (rollCount === 0) {
      userRoll[idx] = Math.floor(Math.random() * 6)
    }
  })
  rollCount += 1
}

updateDisplays = () => {
  diceDisplayEl.forEach((diceDisplay,idx) => {
    if (userRoll[idx] == '0') diceDisplay.style.backgroundImage = "url('./assets/images/dice1.png')"
    else if (userRoll[idx] == '1') diceDisplay.style.backgroundImage = "url('./assets/images/dice2.png')"
    else if (userRoll[idx] == '2') diceDisplay.style.backgroundImage = "url('./assets/images/dice3.png')"
    else if (userRoll[idx] == '3') diceDisplay.style.backgroundImage = "url('./assets/images/dice4.png')"
    else if (userRoll[idx] == '4') diceDisplay.style.backgroundImage = "url('./assets/images/dice5.png')"
    else if (userRoll[idx] == '5') diceDisplay.style.backgroundImage = "url('./assets/images/dice6.png')"
    else diceDisplay.style.backgroundImage = 'none'
  })
  keeperDisplayEl.forEach((keeperDisplay,idx) => {
    if (keepers[idx] == '0') keeperDisplay.style.backgroundImage = "url('./assets/images/dice1.png')"
    else if (keepers[idx] == '1') keeperDisplay.style.backgroundImage = "url('./assets/images/dice2.png')"
    else if (keepers[idx] == '2') keeperDisplay.style.backgroundImage = "url('./assets/images/dice3.png')"
    else if (keepers[idx] == '3') keeperDisplay.style.backgroundImage = "url('./assets/images/dice4.png')"
    else if (keepers[idx] == '4') keeperDisplay.style.backgroundImage = "url('./assets/images/dice5.png')"
    else if (keepers[idx] == '5') keeperDisplay.style.backgroundImage = "url('./assets/images/dice6.png')"
    else keeperDisplay.style.backgroundImage = 'none'
  })
  rollCountEl.textContent = `Roll Count: ${rollCount}`
}

setStylingAcesThroughSixes = ((someTotal,idx) => {
  if (someTotal >= 1) {
    scoreTextEls[idx].style.borderColor = 'green'
    scoreNumberEls[idx].style.borderColor = 'green'
    scoreNumberEls[idx].textContent = `${someTotal}`
  } else {
    scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
    scoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
    scoreNumberEls[idx].textContent = '00'
  }
})

init = () => {
  userRoll = [null,null,null,null,null]
  rollCountEl.textContent = `Roll Count: ${rollCount}`
}

checkForScore = () => {
  //r checking for the ones score option
  let acesTotal = 0
  keepers.forEach((keeper) => {
    if (keeper == 0) {
      acesTotal += (keeper+1)
    }
  })
  //o checking for the twos score option
  let twosTotal = 0
  keepers.forEach((keeper) => {
    if (keeper == 1) {
      twosTotal += (keeper+1)
    }
  })
  //y checking for the threes score option
  let threesTotal = 0
  keepers.forEach((keeper) => {
    if (keeper == 2) {
      threesTotal += (keeper+1)
    }
  })
  //g checking for the fours score option
  let foursTotal = 0
  keepers.forEach((keeper) => {
    if (keeper == 3) {
      foursTotal += (keeper+1)
    }
  })
  //b checking for the fives score option
  let fivesTotal = 0
  keepers.forEach((keeper) => {
    if (keeper == 4) {
      fivesTotal += (keeper+1)
    }
  })
  //p checking for the sixes score option
  let sixesTotal = 0
  keepers.forEach((keeper) => {
    if (keeper == 5) {
      sixesTotal += (keeper+1)
    }
  })

  //r set styling for scoreboard if player can score in aces
  setStylingAcesThroughSixes(acesTotal,0)
  setStylingAcesThroughSixes(twosTotal,1)
  setStylingAcesThroughSixes(threesTotal,2)
  setStylingAcesThroughSixes(foursTotal,3)
  setStylingAcesThroughSixes(fivesTotal,4)
  setStylingAcesThroughSixes(sixesTotal,5)
}

//b ===============================================================================

init()
