export default class Key {
    toBinary() {
        return this.key;
    }

    toHex() {
        return '0x' + BigInt('0b' + this.key).toString(16);
    }

    toDec() {
        return BigInt('0b' + this.key);
    }
}