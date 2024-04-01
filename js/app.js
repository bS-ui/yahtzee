let userRoll = [];
let keepers = [];
let rollCount = 1
let score = 0
let turn = 0

//r ===============================================================================

const diceDisplayEl = document.querySelectorAll('.dice-display')
const keeperDisplayEl = document.querySelectorAll('.keeper-dice')
const rollButtonEl = document.querySelector('.roll-button')
const rollCountEl = document.querySelector('.roll-count')
const scoreTextEls = document.querySelectorAll('.score-text')
const scoreNumberEls = document.querySelectorAll('.score-number')
const tempScoreNumberEls = document.querySelectorAll('.temp-number')
const resetButtonEl = document.querySelector('.reset-button')
const turnStatusEl = document.querySelector('.roll-subheading')

//o ===============================================================================

diceDisplayEl.forEach(diceDisplay => {
  diceDisplay.addEventListener('click', handleDiceDisplayClick)
})

keeperDisplayEl.forEach(keeperDisplay => {
  keeperDisplay.addEventListener('click', handleKeeperDisplayClick)
})

rollButtonEl.addEventListener('click', handleRollBtnClick)

tempScoreNumberEls.forEach(score => {
  score.addEventListener('click', handleScore)
})

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
  if (turn == 1) {
    turnStatusEl.textContent = `Turn ${turn}`
    doRoll()
  } else {
    if (rollCount !== 3 ) {
      doRoll()
    }
  }
}

function handleScore(event) {
  if (event.target.id == 'tn-aces' && scoreNumberEls[0].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[0].textContent = tempScoreNumberEls[0].textContent
    scoreNumberEls[0].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-twos' && scoreNumberEls[1].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[1].textContent = tempScoreNumberEls[1].textContent
    scoreNumberEls[1].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-threes' && scoreNumberEls[2].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[2].textContent = tempScoreNumberEls[2].textContent
    scoreNumberEls[2].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-fours' && scoreNumberEls[3].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[3].textContent = tempScoreNumberEls[3].textContent
    scoreNumberEls[3].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-fives' && scoreNumberEls[4].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[4].textContent = tempScoreNumberEls[4].textContent
    scoreNumberEls[4].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-sixes' && scoreNumberEls[5].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[5].textContent = tempScoreNumberEls[5].textContent
    scoreNumberEls[5].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-3-of-a-kind' && scoreNumberEls[6].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[6].textContent = tempScoreNumberEls[6].textContent
    scoreNumberEls[6].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-4-of-a-kind' && scoreNumberEls[7].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[7].textContent = tempScoreNumberEls[7].textContent
    scoreNumberEls[7].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-full-house' && scoreNumberEls[8].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[8].textContent = tempScoreNumberEls[8].textContent
    scoreNumberEls[8].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-sm-straight' && scoreNumberEls[9].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[9].textContent = tempScoreNumberEls[9].textContent
    scoreNumberEls[9].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-lg-straight' && scoreNumberEls[10].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[10].textContent = tempScoreNumberEls[10].textContent
    scoreNumberEls[10].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-yahtzee' && scoreNumberEls[11].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[11].textContent = tempScoreNumberEls[11].textContent
    scoreNumberEls[11].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
  }
  else if (event.target.id == 'tn-chance' && scoreNumberEls[12].style.borderColor != 'var(--cool-green)') {
    scoreNumberEls[12].textContent = tempScoreNumberEls[12].textContent
    scoreNumberEls[12].style.borderColor = 'var(--cool-green)'
    doScoreStuff()
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
  checkForScore()
  updateDisplays()
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
  if (rollCount < 3) rollCountEl.style.backgroundColor = 'var(--cool-green)'
  else rollCountEl.style.backgroundColor = 'var(--cool-red)'
}

doScoreStuff = () => {
  userRoll = [null,null,null,null,null]
  keepers = [null,null,null,null,null]
  rollCount = 0
  turn++
  turnStatusEl.textContent = `Turn ${turn}`
  updateDisplays()
  checkForScore()
}

setStylingAcesThroughSixes = ((totals) => {
  let idx = 0
  for (let total in totals) {
    if (totals[total] >=1 && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
      scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].textContent = `${totals[total]*(idx+1)}`
    } else {
      scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].textContent = '00'
    }
    idx++
  }
})

setStylingThreeOfAKind = ((idx,actualNumTotal,totals) => {
  for (let total in totals) {
    if (totals[total] >= 3 && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
      scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].textContent = `${actualNumTotal}`
      return
    } else {
      scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].textContent = '00'
    }
  }
})

setStylingFourOfAKind = ((idx,actualNumTotal,totals) => {
  for (let total in totals) {
    if (totals[total] >= 4 && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
      scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].textContent = `${actualNumTotal}`
      return
    } else {
      scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].textContent = '00'
    }
  }
})

setStylingFullHouse = ((idx,totals) => {
  if (((totals.acesTotal == 3 || totals.twosTotal == 3 || totals.threesTotal == 3 || totals.foursTotal == 3 || totals.fivesTotal == 3 || totals.sixesTotal == 3) && (totals.acesTotal == 2 || totals.twosTotal == 2 || totals.threesTotal == 2 || totals.foursTotal == 2 || totals.fivesTotal == 2 || totals.sixesTotal == 2)) && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].textContent = 25
  } else {
    scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].textContent = '00'
  }
})

setStylingSmallStraight = ((idx,totals) => {
  if (((totals.acesTotal == 1 && totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1) || (totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1) || (totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1 && totals.sixesTotal == 1)) && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].textContent = 30
  } else {
    scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].textContent = '00'
  }
})

setStylingLargeStraight = ((idx,totals) => {
  if (((totals.acesTotal == 1 && totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1) || (totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1 && totals.sixesTotal == 1)) && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].textContent = 40
  } else {
    scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].textContent = '00'
  }
})

setStylingYahtzee = ((idx,totals) => {
  if ((totals.acesTotal == 5 || totals.twosTotal == 5 || totals.threesTotal == 5 || totals.foursTotal == 5 || totals.fivesTotal == 5 || totals.sixesTotal == 5) && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[idx].textContent = 50
  } else {
    scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[idx].textContent = '00'
  }
})

init = () => {
  userRoll = [null,null,null,null,null]
  keepers = [null,null,null,null,null]
  rollCount = 0
  score = 0
  turn = 1
  rollCountEl.textContent = `Roll Count: ${rollCount}`
  scoreTextEls.forEach(score => {
    score.style.borderColor = 'var(--cool-red)'
  })
  scoreNumberEls.forEach(number => {
    number.style.borderColor = 'var(--cool-red)'
    number.textContent = '00'
  })
  updateDisplays()
}

checkForScore = () => {
  //r setting totals to/back to 0 when function is called
  let actualTotalIndex = 1
  let actualNumTotal = 0
  let totals = {acesTotal:0,twosTotal:0,threesTotal:0,foursTotal:0,fivesTotal:0,sixesTotal:0}
  //r counting how many of each dice face is in the keepers area
  keepers.forEach((keeper) => {
    if (keeper == 0) totals.acesTotal += 1
    else if (keeper == 1) totals.twosTotal += 1
    else if (keeper == 2) totals.threesTotal += 1
    else if (keeper == 3) totals.foursTotal += 1
    else if (keeper == 4) totals.fivesTotal += 1
    else if (keeper == 5) totals.sixesTotal += 1
  })
  //r totaling up the keepers section and roll section for use in 3 of a kind and 4 of a kind
  for (let total in totals) {
    actualNumTotal += ((totals[total]*actualTotalIndex))
    actualTotalIndex++
  }
  userRoll.forEach(roll => {
    if (roll != null) {
      actualNumTotal += (roll+1)
    }
  })
  //r set styling for scoreboard if player can score in aces
  setStylingAcesThroughSixes(totals)
  //r set styling for scoreboard if player can score in 3 of a kind
  setStylingThreeOfAKind(6,actualNumTotal,totals)
  //r set styling for scoreboard if player can score in 4 of a kind
  setStylingFourOfAKind(7,actualNumTotal,totals)
  //r set styling for scoreboard if player can score in full house
  setStylingFullHouse(8,totals)
  //r set styling for scoreboard if player can score in small straight
  setStylingSmallStraight(9,totals)
  //r set styling for scoreboard if player can score in large straight
  setStylingLargeStraight(10,totals)
  //r set styling for scoreboard if player can score yahtzee
  setStylingYahtzee(11,totals)
}
//b ===============================================================================

init()
