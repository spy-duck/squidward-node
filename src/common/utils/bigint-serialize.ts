declare global {
    interface BigInt {
        toJSON(): string;
    }
}

BigInt.prototype.toJSON = function () {
    // eslint-disable-next-line
    return this.toString();
};