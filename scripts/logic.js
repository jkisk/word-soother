
const _ = require('lodash')








const wordPick = (array) => {
    shuffled = _.shuffle(array)
    return shuffled
}








module.exports = {wordPick}