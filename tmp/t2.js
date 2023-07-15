class Foo {
    name = 'zs'
    age = 18
    constructor(apiConfig = {}) {
        Object.assign(this, apiConfig);
    }
}

class Bar extends Foo{
    score = 98
}

let bar = new Bar({gender:'女'})

console.log(bar.name, bar.age, bar.gender, bar.score)