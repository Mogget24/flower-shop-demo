import readline from 'readline'
import * as flowerShopTools from './dist/cjs/flower-shop-tools.cjs'

console.log('Welcome to Flower Shop Demo')
console.log('Please write your order below in the correct format')
console.log('Code for Roses: R12')
console.log('Code for Lilies: L09')
console.log('Code for Tulips: T58')
console.log('Please type "Done" once finished')

const lines = [];

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readlineInterface.prompt();

readlineInterface.on('line', (line) => {
    // Close case
    if (/done/gi.test(line)) {
        try {
            console.log('gne',flowerShopTools.generateTotal(lines))
        }
        catch (error) {
            console.log('error', error)
        }
        process.exit(0);
    }

    // Append normal string
    else {
        const [quantity, code] = line.split(' ')
        lines.push({ quantity, code })
    }

    readlineInterface.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
}); 