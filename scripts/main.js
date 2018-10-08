const words = require('./data')
const logic = require('./logic')
const _ = require('lodash')




const form = document.querySelector('form') 

const shuffledArray = logic.wordPick(words)
const shuffledWord = _.shuffle(shuffledArray[0]).join('')

const playArea = document.querySelector('#playArea')
console.log(playArea)
playArea.innerHTML = shuffledWord

form.addEventListener('submit', (e) => {
e.preventDefault()

console.log(document.getElementById('answer').value)

console.log(shuffledWord)



if (document.getElementById('answer').value === shuffled[0]) {
    alert('Correct!')
} else {
    alert('Nope')
}



})







