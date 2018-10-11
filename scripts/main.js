const { spices, creatures, countries, colors } = require('./data')
const logic = require('./logic')
const _ = require('lodash')



const themeChooser = document.getElementById('theme')
let theme = spices

let shuffledArray = logic.wordPick(theme)
const form = document.querySelector('form')

let shuffledWord = _.shuffle(shuffledArray[0]).join('')
let heldLetterId

themeChooser.addEventListener('change', (e) => {
    console.log(e.target.value)
    if (e.target.value === 'spices') {
        theme = logic.wordPick(spices)

    }
    if (e.target.value === 'creatures') {
        theme = logic.wordPick(creatures)

    }if (e.target.value === 'countries') {
        theme = logic.wordPick(countries)

    }
if (e.target.value === 'colors') {
        theme = logic.wordPick(colors)
    }
        shuffledArray = logic.wordPick(theme)
        shuffledWord = _.shuffle(shuffledArray[0]).join('')
        renderShuffledWord(shuffledWord)
       
})





document.getElementById("answer").focus();

const renderShuffledWord = (word) => {

    const playArea = document.querySelector('#playArea')
    playArea.innerHTML = ''
    for (let i = 0; i < word.length; i++) {
        let gameBoard = `<div class="letterbox" data-id ="${i}" data-letter="${word[i]}" draggable = "true">${word[i]}</div>`
        playArea.innerHTML += gameBoard

    }
        document.getElementById('answer').value = ''
        document.querySelector('.feedback').innerHTML = ''
        document.getElementById("submit").disabled = false
        document.getElementById("answer").focus()
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
            const droppingLetter = shuffledWord[heldLetterId]
            const splitShuffledWord = shuffledWord.split('')
           
            splitShuffledWord.splice(heldLetterId, 1)
            splitShuffledWord.splice(targetLetterId, 0, droppingLetter)

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



    if (document.getElementById('answer').value.toLowerCase() === shuffledArray[0]) {
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
        document.getElementById('answer').value = ''
        

        const replay = () => {
            document.querySelector('.feedback').innerHTML = ''
            shuffledArray = logic.wordPick(theme)
            shuffledWord = _.shuffle(shuffledArray[0]).join('')
            renderShuffledWord(shuffledWord)
            
        }
        setTimeout(replay, 2000)

    } else {
        let feedback = document.querySelector('.feedback')
        feedback.innerHTML = `<p class='message'>Keep Trying</p>`

    }

})



const reset = document.querySelector('.reset')
reset.addEventListener('click', (e) => {
    document.getElementById("submit").disabled = true
    let feedback = document.querySelector('.feedback')
    feedback.innerHTML = `<p class='message'>${shuffledArray[0]}</p>`
    const newWord = () => {
        shuffledArray = logic.wordPick(theme)
        shuffledWord = _.shuffle(shuffledArray[0]).join('')
        renderShuffledWord(shuffledWord)
        
    }
    setTimeout(newWord, 2000)

})







