const window_size = 8;
const buffer_size = 4;
const test = 'A_ASA_DA_CASA';

const tuples = encode(test);
console.log(tuples);
console.log(decode(tuples));

const bitsForWindow = (Math.log2(window_size)) + 1;
const bitsForBuffer = Math.ceil(Math.log2(buffer_size)) + 1;
const bitsForChar = 8;


const tupleSize = bitsForWindow + bitsForBuffer + bitsForChar;
const listSize = tupleSize * tuples.length;

console.log('Bits para janela:\t' + bitsForWindow);
console.log('Bits para buffer:\t' + bitsForBuffer);
console.log('Bits para caractere:\t' + bitsForChar);
console.log('Tamanho da tupla:\t' + tupleSize);
console.log('Qtd tuplas geradas:\t' + tuples.length);
console.log('Tamanho do arquivo:\t' + listSize);

function encode(str) {
    const res = [];
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

                if ((i + size) < str.length)
                    literal = str[i + size];

                tuple = { a: window.length - index - 1, b: size, c: literal };
                break;
            }
        }

        i += tuple.b + 1;
        res.push(tuple);
    }

    return res;
}

function decode(list) {
    let res = '';
    list.forEach(tuple => {
        let pos = res.length - tuple.a - 1;
        res += res.substring(pos, pos + tuple.b) + tuple.c;
    });

    return res;
}