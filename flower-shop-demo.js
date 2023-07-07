import readline from 'readline'
import * as flowerShopTools from './dist/cjs/flower-shop-tools.cjs'

console.log('Welcome to Flower Shop Demo')

const printBasicInfo = () => {
    console.log('Please write your order below in the correct format')
    console.log('Code for Roses: R12')
    console.log('Code for Lilies: L09')
    console.log('Code for Tulips: T58')
    console.log('Please type "Done" once finished')
}

let lines = [];

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

printBasicInfo()
readlineInterface.prompt();

readlineInterface.on('line', (line) => {
    // Close case
    if (/done/gi.test(line)) {
        try {
            flowerShopTools.generateTotal(lines)
            console.log('Thank you for using the Flower Shop tool!');
            process.exit(0);
        }
        catch (error) {
            console.log('error', error)
            console.log('please try again')
            lines = []
            // let's give the user some time before printing everything again
            setTimeout(() => { printBasicInfo() }, 1000)
        }

    }

    // Append normal string
    else {
        let [quantity, code] = line.split(' ')
        // setup a default
        if (quantity === undefined)
            quantity = 0
        if (code === undefined)
            code = ""
        lines.push({ quantity, code })
    }

    readlineInterface.prompt();
}).on('close', () => {
    console.log('Thank you for using the Flower Shop tool!');
    process.exit(0);
}); 