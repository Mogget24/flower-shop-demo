import { IFlowerShopBundle, IFlowerShopData } from "./flower-shop-tools.types";

export const flowerShopData: IFlowerShopData[] = [
    {
        name: 'Roses',
        code: 'R12',
        bundles: [
            {
                quantity: 5,
                price: "$6.99"
            },
            {
                quantity: 10,
                price: "$12.99"
            }
        ]
    },
    {
        name: 'Lilies',
        code: 'L09',
        bundles: [
            {
                quantity: 3,
                price: "$9.95"
            },
            {
                quantity: 6,
                price: "$16.95"
            },
            {
                quantity: 9,
                price: "$24.95"
            }
        ]
    },
    {
        name: 'Tulips',
        code: 'T58',
        bundles: [
            {
                quantity: 3,
                price: "$5.95"
            },
            {
                quantity: 5,
                price: "$9.95"
            },
            {
                quantity: 9,
                price: "$16.99"
            }
        ]
    }
]

// Filters the array of data based on the code
export const getFlowerByCode = (code:string) => {
    // also forcing to-upper-case in order to have the user allowed to enter the code in lower case without any error
    return flowerShopData.find(flower => flower.code === code.toUpperCase())
}

// Get minimum quantity, based on the provided code
export const getMinimumQuantityOfGivenFlowerCode = (code: string) => {
    const flowerByCode = getFlowerByCode(code)
    return Math.min(...flowerByCode!.bundles?.map((bundle: IFlowerShopBundle) => bundle.quantity))
}

// Validate given data
// This checks many things given the user input
type TCheckGivenData = (data: TGenerateToolData[]) => string[]
export const checkGivenData: TCheckGivenData = (data) => {
    // This approach should be cleaner
    // const errors: string[] = data.reduce((finalErrors, currentData) => {
    //     if (currentData.code === "") {
    //         return [...finalErrors, 'code must not be empty']
    //     }
    //     return finalErrors
    // }, [])
    const errors: string[] = []
    if (data.length === 0) {
        errors.push('empty order')
    } else {
        data.forEach(currentData => {

            // Check code
            if (currentData.code === "") {
                errors.push('code must not be empty')
            }

            // Check quantity
            if (currentData.quantity === 0) {
                errors.push('quantity must be greater than 0')
            }

            // Check if code exists
            const flowerWithGivenCode = getFlowerByCode(currentData.code)
            if (!flowerWithGivenCode) {
                errors.push('given code is invalid')
            } else {
                const minQuantity = getMinimumQuantityOfGivenFlowerCode(currentData.code)
                if(currentData.quantity < minQuantity) {
                    errors.push(`minimum quantity for ${currentData.code} is ${minQuantity}`)   
                }
            }

        })
    }
    return errors
}

// Get Total result based on user input
// Reaching this point it means that we have a valid quantity for a valid code
type TGetTotalResult = (data: TGenerateToolData[]) => string
const getTotalResult: TGetTotalResult = (data) => {

    const total = []

    data.forEach(currentData => {
        const flowerWithGivenCode = getFlowerByCode(currentData.code)
        
    })

    return ''
}

// Main function for generating the total
// It checks errors before trying to get a total value
type TGenerateToolData = { code: string, quantity: number }
type TGenerateTool = (data: TGenerateToolData[]) => string
export const generateTotal: TGenerateTool = (data: TGenerateToolData[]) => {
    console.log('data', data)

    // Validate the passed data
    const errorsFromGivenData = checkGivenData(data)
    if (errorsFromGivenData.length > 0)
        throw errorsFromGivenData.join(' ')

    // data is valid
    // Let's calculate the total
    const totalResult = getTotalResult(data)
    return totalResult
}