let userRoll = []
let keepers = []
let rollCount = 1
let upperscore = 0
let lowerscore = 0
let totalscore = 0
let turn = 0
let highscore

//r ===============================================================================

// Might use later, I decided to mess with the styling a bit.

// const redButtonEl = document.querySelector('#Y')
// const orangeButtonEl = document.querySelector('#a')
// const yellowButtonEl = document.querySelector('#h')
// const greenButtonEl = document.querySelector('#t')
// const blueButtonEl = document.querySelector('#z')
// const indigoButtonEl = document.querySelector('#e')
// const violetButtonEl = document.querySelector('#e2')
// const blackButtonEl = document.querySelector('#exclamation')

const diceDisplayEl = document.querySelectorAll('.dice-display')
const keeperDisplayEl = document.querySelectorAll('.keeper-dice')
const rollButtonEl = document.querySelector('.roll-button')
const rollCountEl = document.querySelector('.roll-count')
const scoreTextEls = document.querySelectorAll('.score-text')
const scoreNumberEls = document.querySelectorAll('.score-number')
const tempScoreNumberEls = document.querySelectorAll('.temp-number')
const resetButtonEl = document.querySelector('.reset-button')
const turnStatusEl = document.querySelector('.roll-subheading')
const totalScoreEl = document.querySelector('#n-total')
const upperScoreEl = document.querySelector('#n-upper-total')
const lowerScoreEl = document.querySelector('#n-lower-total')
const highScoreDisplayEl = document.querySelector('.high-score-display')
const colorChangerButtonEl = document.querySelector('.yahtzee-header')
const root = document.querySelector(':root')

const score = new Audio('../assets/audio/score.mp3')
const move = new Audio('../assets/audio/move.mp3')
const game_complete = new Audio('../assets/audio/game_complete.mp3')
const dice_roll = new Audio('../assets/audio/dice_roll.mp3')

//o ===============================================================================

diceDisplayEl.forEach(diceDisplay => {
  diceDisplay.addEventListener('click', handleDiceDisplayClick)
})

keeperDisplayEl.forEach(keeperDisplay => {
  keeperDisplay.addEventListener('click', handleKeeperDisplayClick)
})

tempScoreNumberEls.forEach(score => {
  score.addEventListener('click', handleScore)
})

resetButtonEl.addEventListener('click', handleResetBtnClick)
rollButtonEl.addEventListener('click', handleRollBtnClick)

// Might use later, I decided to mess with the styling a bit.

// redButtonEl.addEventListener('click', handleThemeChanging)
// orangeButtonEl.addEventListener('click', handleThemeChanging)
// yellowButtonEl.addEventListener('click', handleThemeChanging)
// greenButtonEl.addEventListener('click', handleThemeChanging)
// blueButtonEl.addEventListener('click', handleThemeChanging)
// indigoButtonEl.addEventListener('click', handleThemeChanging)
// violetButtonEl.addEventListener('click', handleThemeChanging)
// blackButtonEl.addEventListener('click', handleThemeChanging)

//y ===============================================================================

function handleDiceDisplayClick(evt) {
  let clickIdx = evt.target.id.substring(1)
  if (userRoll[clickIdx] !== null) {
    keepers[clickIdx] = Number((userRoll.splice(clickIdx,1,null)))
    move.volume = .05
    move.play()
    updateDisplays()
    checkForScore()
  }
}

function handleKeeperDisplayClick(evt) {
  let clickIdx = evt.target.id.substring(1)
  if (keepers[clickIdx] !== null) {
    userRoll[clickIdx] = Number((keepers.splice(clickIdx,1,null)))
    move.volume = .05
    move.play()
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

function handleResetBtnClick() {
  init()
}

// Might use later, I decided to mess with the styling a bit.

// function handleThemeChanging(event) {
//   if (event.target.id == 'Y') {
//     root.style.setProperty('--board-border','#4a2a2a')
//     root.style.setProperty('--board-background','#ffbfbf')
//     root.style.setProperty('--board-color','#d67a7a')
//   }
//   if (event.target.id == 'a') {
//     root.style.setProperty('--board-border','#4a3b2a')
//     root.style.setProperty('--board-color','#d6ab7a')
//     root.style.setProperty('--board-background','#ffe3bf')
//   }
//   if (event.target.id == 'h') {
//     root.style.setProperty('--board-border','#4a472a')
//     root.style.setProperty('--board-color','#d6d07a')
//     root.style.setProperty('--board-background','#fff9bf')
//   }
//   if (event.target.id == 't') {
//     root.style.setProperty('--board-border','#1b4332')
//     root.style.setProperty('--board-color','#40916c')
//     root.style.setProperty('--board-background','#b7e4c7')
//   }
//   if (event.target.id == 'z') {
//     root.style.setProperty('--board-border','#2a3b4a')
//     root.style.setProperty('--board-color','#7ab4d6')
//     root.style.setProperty('--board-background','#bfebff')
//   }
//   if (event.target.id == 'e') {
//     root.style.setProperty('--board-border','#402a4a')
//     root.style.setProperty('--board-color','#b97ad6')
//     root.style.setProperty('--board-background','#e8bfff')
//   }
//   if (event.target.id == 'e2') {
//     root.style.setProperty('--board-border','#4a2a43')
//     root.style.setProperty('--board-color','#d67ac7')
//     root.style.setProperty('--board-background','#ffbff4')
//   }

//   if (event.target.id == 'exclamation') {
//     root.style.setProperty('--board-border','#212227')
//     root.style.setProperty('--board-color','#8693AB')
//     root.style.setProperty('--board-background','#BDD4E7')
//   }
// }

//g ===============================================================================

doRoll = () => {
  if (rollCount < 3) {
  userRoll.forEach((roll,idx) => {
    if (rollCount > 0 && userRoll[idx] !== null) {
      userRoll[idx] = Math.floor(Math.random() * 6)
    }
    else if (rollCount === 0) {
      userRoll[idx] = Math.floor(Math.random() * 6)
    }
  })
  rollCount += 1
  dice_roll.volume = .05
  dice_roll.play()
  checkForScore()
  updateDisplays()
  }
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
    if (diceDisplay.style.backgroundImage != 'none') diceDisplay.style.boxShadow = '10px 10px'
    else diceDisplay.style.boxShadow = '0px 0px'
  })
  keeperDisplayEl.forEach((keeperDisplay,idx) => {
    if (keepers[idx] == '0') keeperDisplay.style.backgroundImage = "url('./assets/images/dice1.png')"
    else if (keepers[idx] == '1') keeperDisplay.style.backgroundImage = "url('./assets/images/dice2.png')"
    else if (keepers[idx] == '2') keeperDisplay.style.backgroundImage = "url('./assets/images/dice3.png')"
    else if (keepers[idx] == '3') keeperDisplay.style.backgroundImage = "url('./assets/images/dice4.png')"
    else if (keepers[idx] == '4') keeperDisplay.style.backgroundImage = "url('./assets/images/dice5.png')"
    else if (keepers[idx] == '5') keeperDisplay.style.backgroundImage = "url('./assets/images/dice6.png')"
    else keeperDisplay.style.backgroundImage = 'none'
    if (keeperDisplay.style.backgroundImage != 'none') keeperDisplay.style.boxShadow = '10px 10px'
    else keeperDisplay.style.boxShadow = '0px 0px'
  })
  rollCountEl.textContent = `Roll Count: ${rollCount}`
  if (rollCount < 3) rollCountEl.style.color = 'var(--cool-green)'
  else rollCountEl.style.color = 'var(--cool-red)'
}

doScoreStuff = () => {
  totalscore = 0
  upperscore = 0
  lowerscore = 0
  for (let i = 0; i < 13; i++) {
    totalscore += Number(scoreNumberEls[i].textContent)
  }
  for (let i = 0; i < 6; i++) {
    upperscore += Number(scoreNumberEls[i].textContent)
  }
  for (let i = 6; i < 13; i++) {
    lowerscore += Number(scoreNumberEls[i].textContent)
  }
  lowerScoreEl.textContent = lowerscore
  if (lowerScoreEl.textContent != 0) {
    lowerScoreEl.style.borderColor = 'var(--cool-green)'
  }
  upperScoreEl.textContent = upperscore
  if (upperScoreEl.textContent != 0) {
    upperScoreEl.style.borderColor = 'var(--cool-green)'
  }
  totalScoreEl.textContent = totalscore
  if (totalScoreEl.textContent != 0) {
    totalScoreEl.style.borderColor = 'var(--cool-green)'
  }
  if (turn == 13) {
    userRoll = [null,null,null,null,null]
    keepers = [null,null,null,null,null]
    updateDisplays()
    if (totalscore > highscore) {
      localStorage.setItem("highscoreVal", totalscore)
      highScoreDisplayEl.textContent = `High Score: ${totalscore}`
      turnStatusEl.textContent = "Congratulations! You beat your high score!"
      confetti.start()
      game_complete.volume = .05
      game_complete.play()
    } else {
      turnStatusEl.textContent = `Your final score was: ${totalscore}. Great Job!`
      game_complete.volume = .05
      game_complete.play()
    }
  } else {
    score.volume = .05
    score.play()
    userRoll = [null,null,null,null,null]
    keepers = [null,null,null,null,null]
    rollCount = 0
    turn++
    turnStatusEl.textContent = `Turn ${turn}`
    updateDisplays()
    checkForScore()
  }
}

init = () => {
  highscore = localStorage.getItem("highscoreVal")
  confetti.stop()
  tempScoreNumberEls[12].style.borderColor = 'var(--cool-red)'
  tempScoreNumberEls[12].textContent = 0
  highScoreDisplayEl.textContent = `High Score: ${highscore}`
  rollCount = 0
  upperscore = 0
  lowerscore = 0
  totalscore = 0
  turn = 1
  turnStatusEl.textContent = "Click the 'Roll Dice' button to begin!"
  rollCountEl.textContent = `Roll Count: ${rollCount}`
  userRoll = [null,null,null,null,null]
  keepers = [null,null,null,null,null]
  scoreTextEls.forEach(score => {
    score.style.borderColor = 'var(--cool-red)'
  })
  scoreNumberEls.forEach(number => {
    number.style.borderColor = 'var(--cool-red)'
    number.textContent = '0'
  })
  checkForScore()
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
  //r set styling for scoreboard if player can score in aces - sixes
  let idx = 0
  for (let total in totals) {
    if (totals[total] >=1 && scoreNumberEls[idx].style.borderColor == 'var(--cool-red)') {
      scoreTextEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[idx].textContent = `${totals[total]*(idx+1)}`
    } else {
      scoreTextEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[idx].textContent = '0'
    }
    idx++
  }
  //r set styling for scoreboard if player can score in 3 of a kind
  for (let total in totals) {
    if (totals[total] >= 3 && scoreNumberEls[6].style.borderColor == 'var(--cool-red)') {
      scoreTextEls[6].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[6].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[6].textContent = `${actualNumTotal}`
      break
    } else {
      scoreTextEls[6].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[6].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[6].textContent = '0'
    }
  }
  //r set styling for scoreboard if player can score in 4 of a kind
  for (let total in totals) {
    if (totals[total] >= 4 && scoreNumberEls[7].style.borderColor == 'var(--cool-red)') {
      scoreTextEls[7].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[7].style.borderColor = 'var(--cool-green)'
      tempScoreNumberEls[7].textContent = `${actualNumTotal}`
      break
    } else {
      scoreTextEls[7].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[7].style.borderColor = 'var(--cool-red)'
      tempScoreNumberEls[7].textContent = '0'
    }
  }
  //r set styling for scoreboard if player can score in full house
  if (((totals.acesTotal == 3 || totals.twosTotal == 3 || totals.threesTotal == 3 || totals.foursTotal == 3 || totals.fivesTotal == 3 || totals.sixesTotal == 3) && (totals.acesTotal == 2 || totals.twosTotal == 2 || totals.threesTotal == 2 || totals.foursTotal == 2 || totals.fivesTotal == 2 || totals.sixesTotal == 2)) && scoreNumberEls[8].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[8].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[8].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[8].textContent = 25
  } else {
    scoreTextEls[8].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[8].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[8].textContent = '0'
  }
  //r set styling for scoreboard if player can score in small straight
  if (((totals.acesTotal == 1 && totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1) || (totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1) || (totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1 && totals.sixesTotal == 1)) && scoreNumberEls[9].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[9].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[9].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[9].textContent = 30
  } else {
    scoreTextEls[9].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[9].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[9].textContent = '0'
  }
  //r set styling for scoreboard if player can score in large straight
  if (((totals.acesTotal == 1 && totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1) || (totals.twosTotal == 1 && totals.threesTotal == 1 && totals.foursTotal == 1 && totals.fivesTotal == 1 && totals.sixesTotal == 1)) && scoreNumberEls[10].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[10].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[10].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[10].textContent = 40
  } else {
    scoreTextEls[10].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[10].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[10].textContent = '0'
  }
  //r set styling for scoreboard if player can score yahtzee
  if ((totals.acesTotal == 5 || totals.twosTotal == 5 || totals.threesTotal == 5 || totals.foursTotal == 5 || totals.fivesTotal == 5 || totals.sixesTotal == 5) && scoreNumberEls[11].style.borderColor == 'var(--cool-red)') {
    scoreTextEls[11].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[11].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[11].textContent = 50
  } else {
    scoreTextEls[11].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[11].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[11].textContent = '0'
  }
  //r set styling for scoreboard if player can score chance
  if (scoreNumberEls[12].style.borderColor == 'var(--cool-red)' && actualNumTotal != 0) {
    tempScoreNumberEls[12].style.borderColor = 'var(--cool-green)'
    tempScoreNumberEls[12].textContent = actualNumTotal
  } else {
    tempScoreNumberEls[12].style.borderColor = 'var(--cool-red)'
    tempScoreNumberEls[12].textContent = 0
  }
}
//b ===============================================================================

init()
