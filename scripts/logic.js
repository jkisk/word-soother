
const _ = require('lodash')




const renderScore = () => {
    let displayScore = localStorage.getItem('score') || 0
    const scorebox = document.querySelector('.scorebox')
    scorebox.innerHTML = `<p class="score">Wins: ${displayScore}</p>`
}



const wordPick = (array) => {
    shuffled = _.shuffle(array)
    return shuffled
}



module.exports = {wordPick, renderScore}