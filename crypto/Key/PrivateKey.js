import Key from './Key.js';
import SHA256 from '../SHA256.js';
import { randomBits } from '../random.js';
import WORDLIST from '../../WORDLIST.js';

export default class PrivateKey extends Key {
    validByteSizes = [16, 20, 24, 28, 32];

    constructor(byteSize = 32) {
        super();
        if (!this.validByteSizes.includes(byteSize))
            throw new Error('Invalid private key byte size');

        this.key = randomBits(byteSize * 8);
        this.byteSize = byteSize;
    }

    async getMnemonic() {
        const entropy = await getEntropy(this.toBinary());
        const mnemonics = entropyToMnemonic(entropy);
        return mnemonics;
    }
}

async function getEntropy(binaryKey) {
    const checksumLength = binaryKey.length / 32;
    const hash = await SHA256(binaryKey);
    const checksum = hash.slice(0, checksumLength);
    return binaryKey + checksum;
}

function entropyToMnemonic(entropy) {
    const mnemonics = [];
    let lastI = 0;
    for (let i = 11; i <= entropy.length; i += 11) {
        const mnemonicIdx = parseInt(entropy.slice(lastI, i), 2);
        const mnemonic = WORDLIST[mnemonicIdx];
        mnemonics.push(mnemonic);
        lastI = i;
    }
    return mnemonics;
}
