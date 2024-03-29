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
    updateDisplays()
    checkForScore()
  }
}

function handleKeeperDisplayClick(evt) {
  let clickIdx = evt.target.id.substring(1)
  if (keepers[clickIdx] !== null) {
    userRoll[clickIdx] = Number((keepers.splice(clickIdx,1,null)))
    updateDisplays()
    checkForScore()
  }
}

function handleRollBtnClick() {
  if (rollCount !== 3) {
    doRoll()
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

setStylingAcesThroughSixes = ((totals) => {
  let idx = 0
  for (let total in totals) {
    if (totals[total] >= 1 && idx == 0) {
      scoreTextEls[idx].style.borderColor = 'green'
      scoreNumberEls[idx].style.borderColor = 'green'
      scoreNumberEls[idx].textContent = `${totals[total]}`
    }
    else if (totals[total] >=1) {
      scoreTextEls[idx].style.borderColor = 'green'
      scoreNumberEls[idx].style.borderColor = 'green'
      scoreNumberEls[idx].textContent = `${totals[total]*(idx+1)}`
    } else {
      scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
      scoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
      scoreNumberEls[idx].textContent = '00'
    }
    idx++
  }
})

setStylingThreeOfAKind = ((idx,actualNumTotal,actualTotal,totals) => {
  for (let total in totals) {
    if (totals[total] >= 3 && actualTotal === 5) {
      scoreTextEls[idx].style.borderColor = 'green'
      scoreNumberEls[idx].style.borderColor = 'green'
      scoreNumberEls[idx].textContent = `${actualNumTotal}`
      return
    } else {
      scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
      scoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
      scoreNumberEls[idx].textContent = '00'
    }
  }
})

init = () => {
  userRoll = [null,null,null,null,null]
  rollCountEl.textContent = `Roll Count: ${rollCount}`
}

checkForScore = () => {
  //r setting totals to/back to 0 when function is called
  let actualNumTotal = 0
  let actualTotalIndex = 1
  let actualTotal = 0
  let totals = {acesTotal:0,twosTotal:0,threesTotal:0,foursTotal:0,fivesTotal:0,sixesTotal:0}
  //o counting how many of each dice face is in the keepers area
  keepers.forEach((keeper) => {
    if (keeper == 0) totals.acesTotal += 1
    else if (keeper == 1) totals.twosTotal += 1
    else if (keeper == 2) totals.threesTotal += 1
    else if (keeper == 3) totals.foursTotal += 1
    else if (keeper == 4) totals.fivesTotal += 1
    else if (keeper == 5) totals.sixesTotal += 1
  })
  for (let total in totals) {
    actualNumTotal += (totals[total]*actualTotalIndex)
    actualTotalIndex++
  }
  actualTotal = Object.values(totals).reduce((a, b) => a + b, 0);

  //y set styling for scoreboard if player can score in aces
  setStylingAcesThroughSixes(totals)
  //y set styling for scoreboard if player can score in 3 of a kind - 1's
  setStylingThreeOfAKind(6,actualNumTotal,actualTotal,totals)
}
//b ===============================================================================

init()
