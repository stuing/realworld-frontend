let myArr = ['aa', 'bb', 'cc', 'dd']

const removeTag = function (tag) { 
    myArr = myArr.filter(function (t) { return t !== tag })
}

const removeTag1 = (tag) => {
    myArr = myArr.filter(t => t != tag)
}

console.log('myArr:', myArr)
removeTag('bb')
console.log('myArr:', myArr)