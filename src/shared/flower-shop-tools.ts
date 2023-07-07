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
export const getFlowerByCode = (code: string) => {
    // also forcing to-upper-case in order to have the user allowed to enter the code in lower case without any error
    return flowerShopData.find(flower => flower.code === code.toUpperCase())
}

// Get minimum quantity, based on the provided code
export const getMinimumQuantityOfGivenFlowerCode = (code: string) => {
    const flowerByCode = getFlowerByCode(code)
    return Math.min(...flowerByCode!.bundles?.map((bundle: IFlowerShopBundle) => bundle.quantity))
}

// Gets a Map of combinations with quantities occurrences
// Basically this is where the magic (should) happen(s)
export const getCombinations = (quantity: number, quantities: number[]) => {

    const combinations = []

    // console.log('quantity', quantity, 'quantities', quantities)
    for (let i = 0; i < quantities.length; i++) {
        // console.log('gne', quantity % quantities[i])

        const quantityModule = quantity % quantities[i]
        // const rest = quantity - (quantityModule * quantities[i])


        // console.log('quantityModule', quantityModule)
        // console.log('rest', rest)

        // if the module is 0 it means that quantity is a multiple of current quantity
        // so push a combination of the current quantity and the array length is the division
        if (quantityModule === 0)
            combinations.push(Array.from({ length: quantity / quantities[i] }, (_) => quantities[i]))

        // if the module of the given quantity with the current quantity is not included in the quantities array
        // it means that we do not have a combination that fullfills the given quantity
        if (!quantities.includes(quantityModule)) {
            continue
        } else {
            // Otherwise there is a quantity and it is added to this array
            // This is where it fails actually
            combinations.push([...Array.from({ length: (quantity / quantities[i]) }, (_) => quantities[i]), quantityModule])
        }
    }
    // console.log('combinations', combinations)

    // Count the occurrencies of same numbers
    // Yes, this is from stackoverflow :D
    // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    const combinationsArranged: Map<number, number>[] = combinations.map(combination => combination.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))

    return combinationsArranged
}

export const getTotalPriceByBundle = (bundle: IFlowerShopBundle) => {
    const numericPrice = parseFloat(bundle.price.replace('$', ''))
    return `${bundle.quantity * numericPrice}$`
}

// Get a combination of bundles for the given quantity
type TBundleResult = { bundle: IFlowerShopBundle; occurrencies: number, code: string, quantity: number, totalPrice?: string, price: string }
export const getBundleCombinationOfGivenFlower = (code: string, quantity: number) => {
    const flowerByCode = getFlowerByCode(code)

    const bundlesToReturn: TBundleResult[] = []

    // Basic case
    // Given quantity is equal to one of those we have
    const bundleWithExactQuantity = flowerByCode?.bundles.find(bundle => bundle.quantity === quantity)

    if (bundleWithExactQuantity) {
        bundlesToReturn.push({
            code,
            quantity,
            bundle: bundleWithExactQuantity,
            price: bundleWithExactQuantity.price,
            occurrencies: 1,
            totalPrice: getTotalPriceByBundle(bundleWithExactQuantity)
        })
    } else {
        const quantitiesForFlower = flowerByCode?.bundles.map(bundle => bundle.quantity)
        // We get the combinations...
        const combinations = getCombinations(quantity, quantitiesForFlower!)

        // console.log('combinations', combinations.entries())

        // ...for each of them we calculate the bundle to return
        combinations.forEach(combination => {
            // console.log('combination', combination)
            for (let [bundleQuantity, occurrencies] of combination) {
                const bundleWithPrice = flowerByCode?.bundles.find(bundle => bundle.quantity === bundleQuantity)
                bundlesToReturn.push({
                    code,
                    quantity,
                    bundle: bundleWithPrice!,
                    price: bundleWithPrice!.price,
                    occurrencies,
                    totalPrice: getTotalPriceByBundle(bundleWithPrice!)
                })
            }
            // const bundleWithPrice = flowerByCode?.bundles.find(bundle => bundle.quantity === bundleQuantity)
        })
    }

    return bundlesToReturn
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
                if (currentData.quantity < minQuantity) {
                    errors.push(`minimum quantity for ${currentData.code} is ${minQuantity}`)
                }

                // And now the complex logic
                // For the given quantity, we need to know if we have a combination of bundles
                // that fit that given quantity
                const bundles = getBundleCombinationOfGivenFlower(currentData.code, currentData.quantity)
                // console.log('bundles', bundles)
                if (bundles.length === 0)
                    errors.push('the is no combination of bundles for the given input')
            }

        })
    }
    return errors
}

// Get Total result based on user input
// Reaching this point it means that we have a valid quantity for a valid code
type TGetTotalResult = (data: TGenerateToolData[]) => TBundleResult[]
export const getTotalResult: TGetTotalResult = (data) => {

    const total: TBundleResult[] = []

    // For each "line" inserted by the user, gather its bundles
    data.forEach(currentData => {
        // const flowerWithGivenCode = getFlowerByCode(currentData.code)
        const bundles = getBundleCombinationOfGivenFlower(currentData.code, currentData.quantity)
        if (bundles.length > 0) {
            bundles.forEach(bundle => total.push(bundle))
        }
    })

    return total
}

type TBreakdown = {
    quantity: number,
    code: string,
    totalPrice: string,
    items: {
        occurrencies: number,
        quantity: number,
        price: string
    }[]
}[]


export const calculateTotalBreakdown = (data: TGenerateToolData[], totalResult: TBundleResult[]) => {

    const breakdown: TBreakdown = []

    // console.log('calculateTotalBreakdown', data, totalResult)

    data.forEach(currentData => {
        const totalPrice = totalResult.reduce((total, currentResult) => {
            const numericPrice = parseFloat(currentResult.price.replace('$', ''))
            return total + (currentResult.occurrencies * numericPrice)
        }, 0)
        breakdown.push({
            quantity: currentData.quantity,
            code: currentData.code,
            totalPrice: `${totalPrice}$`,
            items: totalResult.map(result => {
                return {
                    occurrencies: result.occurrencies,
                    quantity: result.bundle.quantity,
                    price: result.bundle.price
                }
            })
        })
    })

    return breakdown

}

// Main function for generating the total
// It checks errors before trying to get a total value
type TGenerateToolData = { code: string, quantity: number }
type TGenerateTool = (data: TGenerateToolData[]) => TBreakdown
export const generateTotal: TGenerateTool = (data: TGenerateToolData[]) => {
    console.log('data', data)

    // Validate the passed data
    const errorsFromGivenData = checkGivenData(data)
    if (errorsFromGivenData.length > 0)
        throw errorsFromGivenData.join(' ')

    // data is valid
    // Let's calculate the total
    const totalResult = getTotalResult(data)
    // return totalResult
    const totalBreakdown = calculateTotalBreakdown(data, totalResult)

    return totalBreakdown
}