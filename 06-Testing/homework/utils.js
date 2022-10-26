function sumArray(array, num){
    if(!Array.isArray(array)) throw new TypeError('array')
    if(typeof num !== 'number') throw new TypeError('number')

    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            if(array[i] + array[j] === num) {
                return true;
            }
        }
    }
    return false;
}


function pluck(arr, prop){
    return arr.map(o => o[prop])
}

module.exports = {
    sumArray,
    pluck
}