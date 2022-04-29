/**
 * FormatNumberToRender retorna un numero con N dígitos a la izquierda
 * 
 * @param number es el número que se debe colocar al final a la derecha * 4
 * @param quantityOfDigites es la cantidad de dígitos a la izquierda * 3
 * @param digit es el valor 'numero' que se colocará a la izquierda * '0'
 * @returns example string value '0004'
 */
export default function FormatNumberToRender(number, quantityOfDigites, digit) {
    if (!number) {
        number = 0
    }
    return Array(quantityOfDigites - String(number).length + 1).join(digit || '0') + number;
}