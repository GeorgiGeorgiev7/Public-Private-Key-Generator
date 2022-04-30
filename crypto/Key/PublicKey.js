import Key from './Key.js';
import { G } from '../ECC.js';

export default class PublicKey extends Key {
    constructor(privateKey) {
        super();
        const point = G.multiplyDA(privateKey);
        this.key = BigInt('0x' + pointToPublicKey(point)).toString(2);
    }

    formatKey() {
        return '0x04' + this.toHex().slice(2);
    }

    toAddress() {
        return publicKeyToAddress(this.toHex());
    }
};

function pointToPublicKey(point) {
    return BigInt(point.x).toString(16) + BigInt(point.y).toString(16);
}

function publicKeyToAddress(key) {
    const hash = keccak256(key).toString('hex');
    return '0x' + hash.slice(hash.length - 40);
}