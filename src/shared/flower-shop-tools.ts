import { IFlowerShopData } from "./flower-shop-tools.types";

const flowerShopData: IFlowerShopData[] = [
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

console.log('flowerShopData', flowerShopData)

type TCheckGivenData = (data: TGenerateToolData[]) => string[]
const checkGivenData: TCheckGivenData = (data) => {
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
            if (currentData.code === "") {
                errors.push('code must not be empty')
            }
        })
    }
    return errors
}

type TGenerateToolData = { code: string, quantity: number }
type TGenerateTool = (data: TGenerateToolData[]) => string

export const generateTotal: TGenerateTool = (data: TGenerateToolData[]) => {
    console.log('data', data)
    const errorsFromGivenData = checkGivenData(data)
    if (errorsFromGivenData.length > 0)
        throw errorsFromGivenData
    return ''
}

console.log('generateTotal', generateTotal)

type mario = string
const mario: mario = ''
console.log('mario', mario)