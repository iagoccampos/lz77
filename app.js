const sizeof = require('object-sizeof');

let window_size = 8;
let buffer_size = 3;
let test = 'A_ASA_DA_CASA';

let tuples = encode(test);
console.log(tuples);
console.log(decode(tuples));

console.log(`Tamanho da string: ${sizeof(test)}`);
console.log(`Tamanho da lista de tuplas(comprimido): ${sizeof(tuples)}`);

function encode(str) {
    let ret = [];
    let i = 0;

    while (i < str.length) {
        let begin_window = i - window_size;

        if (begin_window < 0)
            begin_window = 0;

        let window = str.substring(begin_window, i);
        let buffer = str.substring(i, i + buffer_size);
        let tuple = { a: 0, b: 0, c: str[i] };

        for (let size = buffer.length; size > 0; size--) {
            let index = window.lastIndexOf(buffer.substring(0, size));

            if (index >= 0) {
                let literal = '';

                if ((i + size) < str.length) {
                    literal = str[i + size];
                }

                tuple = { a: window.length - index - 1, b: size, c: literal };
                break;
            }
        }

        i += tuple.b + 1;
        ret.push(tuple);
    }

    return ret;
}

function decode(list) {
    let ret = '';
    list.forEach(tuple => {
        let pos = ret.length - tuple.a - 1;
        ret += ret.substring(pos, pos + tuple.b) + tuple.c;
    });

    return ret;
}