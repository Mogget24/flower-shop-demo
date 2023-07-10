import { IFlowerShopBundle, IFlowerShopData, TBreakdown, TBundleResult, TCheckGivenData, TGenerateTool, TGenerateToolData, TGetTotalResult, TResultLine } from "./flower-shop-tools.types";

export const flowerShopData: IFlowerShopData[] = [
    {
        name: 'Roses',
        code: 'R12',
        image: 'rose.png',
        // defaultValue: 10,
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
        image: 'lily.png',
        // defaultValue: 15,
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
        image: 'tulip.png',
        // defaultValue: 13,
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

    for (let i = 0; i < quantities.length; i++) {

        const quantityModule = quantity % quantities[i]

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

    // Count the occurrences of same numbers
    // Yes, this is from stackoverflow :D
    // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    const combinationsArranged: Map<number, number>[] = combinations.map(combination => combination.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))

    return combinationsArranged
}

// Returns the total price multiplying the price of the bundle * the number of occurrences
export const getTotalPriceByBundle = (bundle: IFlowerShopBundle, occurrences: number) => {
    const numericPrice = parseFloat(bundle.price.replace('$', ''))
    return `$${numericPrice * occurrences}`
}

// Get a combination of bundles for the given quantity
export const getBundleCombinationOfGivenFlower = (code: string, quantity: number) => {
    const flowerByCode = getFlowerByCode(code)

    const bundlesToReturn: Array<TBundleResult[]> = []

    // Basic case
    // Given quantity is equal to one of those we have
    const bundleWithExactQuantity = flowerByCode?.bundles.find(bundle => bundle.quantity === quantity)

    if (bundleWithExactQuantity) {
        const combinationsToReturn: TBundleResult[] = []
        combinationsToReturn.push({
            code,
            quantity,
            bundle: bundleWithExactQuantity,
            price: bundleWithExactQuantity.price,
            occurrences: 1,
            totalPrice: getTotalPriceByBundle(bundleWithExactQuantity, 1)
        })
        bundlesToReturn.push(combinationsToReturn)
    } else {
        const quantitiesForFlower = flowerByCode?.bundles.map(bundle => bundle.quantity)

        // We get the combinations...
        const combinations = getCombinations(quantity, quantitiesForFlower!)

        // ...for each of them we calculate the bundle to return
        combinations.forEach(combination => {
            const combinationsToReturn: TBundleResult[] = []
            for (let [bundleQuantity, occurrences] of combination) {
                const bundleWithPrice = flowerByCode?.bundles.find(bundle => bundle.quantity === bundleQuantity)
                combinationsToReturn.push({
                    code,
                    quantity,
                    bundle: bundleWithPrice!,
                    price: bundleWithPrice!.price,
                    occurrences,
                    totalPrice: getTotalPriceByBundle(bundleWithPrice!, occurrences)
                })
            }
            bundlesToReturn.push(combinationsToReturn)
        })
    }

    return bundlesToReturn
}

// Receives an array of bundles combinations; it generates the "best" one based on occurrences and prices
const getBestBundleBasedOnOccurrencesAndPrice = (bundles: TBundleResult[][]) => {

    // Find the "best" bundle
    let bundleToReturn: TBundleResult[] | null = null
    let bundlePrice = Infinity;
    for (let i = 0; i < bundles.length; i++) {

        // replace bundleToReturn based on price
        const totalBundlePrice = bundles[i].reduce((total, currentResult) => {
            const numericPrice = parseFloat(currentResult.price.replace('$', ''))
            return total + (currentResult.occurrences * numericPrice)
        }, 0)

        if (totalBundlePrice < bundlePrice) {
            bundleToReturn = bundles[i]
            bundlePrice = totalBundlePrice
        }

    }

    return bundleToReturn

}

// Validate given data
// This checks many things given the user input
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
export const getTotalResult: TGetTotalResult = (data) => {

    const total: TResultLine[] = []

    data.forEach(currentData => {

        // For each "line" inserted by the user, gather its bundles
        const bundles = getBundleCombinationOfGivenFlower(currentData.code, currentData.quantity)

        // Get the "best" one which is the cheaper
        const optimizedBundle: TBundleResult[] | null = getBestBundleBasedOnOccurrencesAndPrice(bundles)
        if (!!optimizedBundle) {

            // Calculate the total price
            const totalPrice = optimizedBundle.reduce((total, currentResult) => {
                const numericPrice = parseFloat(currentResult.price.replace('$', ''))
                return total + (currentResult.occurrences * numericPrice)
            }, 0)

            total.push({
                code: currentData.code,
                quantity: currentData.quantity,
                bundles: optimizedBundle!,
                totalPrice: `$${totalPrice.toFixed(2)}`
            })
        } else {
            console.warn('no optimizedBundle found')
        }

    })

    return total
}

// calculate the brekdown which is the final thing that the user sees
export const calculateTotalBreakdown = (totalResult: TResultLine[]) => {

    const breakdown: TBreakdown = []

    totalResult.forEach(result => {
        breakdown.push({
            quantity: result.quantity,
            code: result.code,
            totalPrice: result.totalPrice,
            items: result.bundles?.map(bundle => {
                return {
                    occurrences: bundle.occurrences,
                    quantity: bundle.bundle.quantity,
                    price: bundle.bundle.price
                }
            })
        })
    })

    return breakdown

}

// Main function for generating the total
// It checks errors before trying to get a total value
export const generateTotal: TGenerateTool = (data: TGenerateToolData[]) => {

    // Validate the passed data
    const errorsFromGivenData = checkGivenData(data)
    if (errorsFromGivenData.length > 0)
        throw errorsFromGivenData.join(' ')

    // data is valid
    // Let's calculate the total
    const totalResult = getTotalResult(data)
    
    // calculate the final breakdown
    const totalBreakdown = calculateTotalBreakdown(totalResult)

    return totalBreakdown
}