export function randomBits(bitSize, signed = false) {
    // validate input
    if (bitSize < 8 || bitSize % 8 !== 0)
        throw new Error('Invalid bit size');

    // set array
    let array = [];
    signed
        ? array = new Int8Array(bitSize / 8)
        : array = new Uint8Array(bitSize / 8);

    // get random values
    let random = crypto.getRandomValues(array);

    // compare positives values to negatives values and set sign
    let sign = '';
    if (signed) {
        let positives = 0, negatives = 0;
        random.forEach(e => { e >= 0 ? ++positives : ++negatives; });
        positives >= negatives ? sign = '' : sign = '-';
    }

    // parse buffer to bits
    let result = sign;
    random.forEach(e => {
        result += e.toString(2).replace('-', '').padStart(8, '0');
    });

    return result;
};