const { spices, creatures } = require('./data')
const logic = require('./logic')
const _ = require('lodash')

// const themeChooser = document.getElementById('theme')

// themeChooser.addEventListener('change', (e) => {
//     console.log(e.target.value)
//     if (e.target.value === 'spices') {

//         shuffledArray = logic.wordPick(spices)

//     }
//     if (e.target.value === 'creatures') {

//         shuffledArray = logic.wordPick(creatures)
        
//     } else {
//         shuffledArray = logic.wordPick(spices)
//     }
    
// })


let shuffledArray = logic.wordPick(spices)
const form = document.querySelector('form')

let shuffledWord = _.shuffle(shuffledArray[0]).join('')
let heldLetterId
// let targetLetterId





document.getElementById("answer").focus();





const renderShuffledWord = (word) => {

    const playArea = document.querySelector('#playArea')
    playArea.innerHTML = ''
    for (let i = 0; i < word.length; i++) {
        let gameBoard = `<div class="letterbox" data-id ="${i}" data-letter="${word[i]}" draggable = "true">${word[i]}</div>`
        playArea.innerHTML += gameBoard

    }
    addDropEvents()
}

const renderScore = () => {
    let displayScore = localStorage.getItem('score')
    const scorebox = document.querySelector('.scorebox')
    scorebox.innerHTML = `<p class="score">Wins: ${displayScore}</p>`
}

renderScore()

const addDropEvents = () => {
    const letterBoxes = document.querySelectorAll('.letterbox')
    for (letterbox of letterBoxes) {
        letterbox.addEventListener("dragover", (e) => {
            e.preventDefault()
        })
        letterbox.addEventListener("dragenter", (e) => {
            e.preventDefault()
        })
        letterbox.addEventListener('drop', (e) => {
            const targetLetterId = e.target.getAttribute('data-id')

            console.log('targetletter', targetLetterId)
            const droppingLetter = shuffledWord[heldLetterId]
            console.log(heldLetterId)
            console.log('dropping letter', droppingLetter)
            const splitShuffledWord = shuffledWord.split('')
            console.log(splitShuffledWord)

            splitShuffledWord.splice(heldLetterId, 1)
            splitShuffledWord.splice(targetLetterId, 0, droppingLetter)

            console.log(splitShuffledWord)

            shuffledWord = splitShuffledWord.join('')
            renderShuffledWord(shuffledWord)
        })
        letterbox.addEventListener('dragstart', (e) => {
            heldLetterId = e.target.getAttribute('data-id')

        })
    }
}

renderShuffledWord(shuffledWord)

form.addEventListener('submit', (e) => {
    e.preventDefault()



    if (document.getElementById('answer').value === shuffledArray[0]) {
        let score = localStorage.getItem('score')
        if (!score) {
            localStorage.setItem('score', 1)
        } else {
            let currentScore = JSON.parse(localStorage.getItem('score'))
            currentScore++
            let reScore = JSON.stringify(currentScore)
            localStorage.setItem('score', reScore)
        }
        let feedback = document.querySelector('.feedback')
        feedback.innerHTML = `<p class ='message'>Success!!</p>`

        renderScore()
        const replay = () => {
            window.location.reload()
        }
        setTimeout(replay, 2000)

    } else {
        console.log(shuffledArray[0])
        let feedback = document.querySelector('.feedback')
        feedback.innerHTML = `<p class='message'>Keep Trying</p>`

    }

})



const reset = document.querySelector('.reset')
reset.addEventListener('click', (e) => {
    let feedback = document.querySelector('.feedback')
    feedback.innerHTML = `<p class='message'>${shuffledArray[0]}</p>`
    const newWord = () => {
        window.location.reload()
    }
    setTimeout(newWord, 2000)

})







