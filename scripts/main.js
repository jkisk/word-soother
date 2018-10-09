const {spices, creatures} = require('./data')
const logic = require('./logic')
const _ = require('lodash')




const form = document.querySelector('form')

const shuffledArray = logic.wordPick(creatures)
const shuffledWord = _.shuffle(shuffledArray[0]).join('')
let heldLetterId


        
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
    scorebox.innerHTML = `<p class="score">*${displayScore}*</p>`
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
            let targetletterId = event.target.getAttribute('data-id')
            const droppingLetter = shuffledWord[heldLetterId]

            const splitShuffledWord = shuffledWord.split('')

            splitShuffledWord.splice(droppingLetter, 1)
            splitShuffledWord.splice(targetletterId, 0, droppingLetter)

            console.log(splitShuffledWord)


            renderShuffledWord(splitShuffledWord.join(''))
        })
        letterbox.addEventListener('dragstart', (e) => {
            heldLetterId = event.target.getAttribute('data-id')

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
        feedback.innerHTML = `<p class='message'>${shuffled[0]}</p>`
        const newWord = () => {
            window.location.reload()
          }
          setTimeout(newWord, 2000)

    })







