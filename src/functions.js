// rounds up any number to a natural number, regardless of decimals
export const roundUp = (num) => {
    let str = num.toString();
    let [integerPart, decimalPart] = str.split('.');
    if (decimalPart) {
      return Number(integerPart + decimalPart.padEnd(decimalPart.length, "0"));
    }
    return Number(integerPart);
}