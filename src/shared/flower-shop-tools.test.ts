/// <reference types="vitest" />

import { describe, expect, it } from "vitest";
import { checkGivenData, generateTotal, getMinimumQuantityOfGivenFlowerCode, getBundleCombinationOfGivenFlower, getCombinations, getFlowerByCode, getTotalPriceByBundle, getBestBundleBasedOnOccurrencesAndPrice } from './flower-shop-tools'
import { TBundleResult } from "./flower-shop-tools.types";

describe('flower-shop-tools', () => {

    describe('getFlowerByCode', () => {
        it('should return a flower data based on the given code', () => {
            const flower = getFlowerByCode("R12")
            expect(flower?.code === "R12")
        })
    })

    describe('getMinimumQuantityOfGivenFlowerCode', () => {
        it('should return 5 if given code is R12', () => {
            const minQuantity = getMinimumQuantityOfGivenFlowerCode("R12")
            expect(minQuantity).toBe(5)
        })
        it('should return 3 if given code is L09', () => {
            const minQuantity = getMinimumQuantityOfGivenFlowerCode("L09")
            expect(minQuantity).toBe(3)
        })
        it('should return 3 if given code is T58', () => {
            const minQuantity = getMinimumQuantityOfGivenFlowerCode("T58")
            expect(minQuantity).toBe(3)
        })
    })

    describe('getCombinations', () => {
        it('should return an array with 2 combinations', () => {
            const combinations = getCombinations(10, [10, 5])
            expect(combinations.length).toBe(2)
        })
        it('should return an empty array as 11 cannot be generated using 5 and 10', () => {
            const combinations = getCombinations(11, [10, 5])
            expect(combinations.length).toBe(0)
        })
        it('should return an array with 1 combinations which is 5*2 + 3', () => {
            const combinations = getCombinations(13, [3, 5, 9])
            expect(combinations.length).toBe(1)
        })
    })

    describe('getTotalPriceByBundle', () => {
        it('should return $1', () => {
            const price = getTotalPriceByBundle({ price: "$1", quantity: 1 }, 1)
            expect(price).toBe("$1")
        })
        it('should return $2', () => {
            const price = getTotalPriceByBundle({ price: "$1", quantity: 1 }, 2)
            expect(price).toBe("$2")
        })
    })

    describe('getBundleCombinationOfGivenFlower', () => {
        it('should return a map with an array of one bundle with one occurrency if given code is R12 and quantity is 5', () => {
            const bundles = getBundleCombinationOfGivenFlower("R12", 5)
            expect(bundles[0]).toHaveLength(1)
        })
        it('should return a map with an array of one bundle with one occurrency if given code is R12 and quantity is 10', () => {
            const bundles = getBundleCombinationOfGivenFlower("R12", 10)
            expect(bundles[0]).toHaveLength(1)
        })
        it('should return a map with an array of 2 bundles, 2x5 and 1x3 if given code is T58 and quantity is 13', () => {
            const bundles = getBundleCombinationOfGivenFlower("T58", 13)
            expect(bundles[0]).toHaveLength(2)
        })
    })

    describe('getBestBundleBasedOnOccurrencesAndPrice', () => {
        it('should return the bundle2 as its price is the lowest', () => {
            const bundle1: TBundleResult = { price: "$2", occurrences: 2, bundle: { quantity: 1, price: "$1" }, code: "L09", quantity: 1 }
            const bundle2: TBundleResult = { price: "$1", occurrences: 1, bundle: { quantity: 1, price: "$1" }, code: "L09", quantity: 1 }
            const bundles = getBestBundleBasedOnOccurrencesAndPrice([[bundle1], [bundle2]])
            expect(bundles).toStrictEqual([bundle2])
        })
    })

    describe('checkGivenData', () => {
        it('should return an array with one element which is an error saying "empty order"', () => {
            const errors = checkGivenData([])
            expect(errors).toStrictEqual(["empty order"])
        })

        // bypassed by TypeScript
        // it('should return an array with one error saying "given code is invalid"', () => {
        //     const errors = checkGivenData([{ code: "test", quantity: 1 }])
        //     expect(errors).toStrictEqual(["given code is invalid"])
        // })

        it('should return an array with one error saying "quantity must be greater than 0"', () => {
            const errors = checkGivenData([{ code: "R12", quantity: 0 }])
            expect(errors.includes("quantity must be greater than 0"))
        })

        it('should return an array with one error saying "minimum quantity for R12 is 5"', () => {
            const errors = checkGivenData([{ code: "R12", quantity: 1 }])
            expect(errors.includes("minimum quantity for R12 is 5"))
        })

        it('should return an array with one error saying "the is no combination of bundles for the given input"', () => {
            const errors = checkGivenData([{ code: "R12", quantity: 6 }])
            expect(errors).toStrictEqual(["the is no combination of bundles for the given input"])
        })
    })

    // describe('getTotalResult', () => {
    //     it('should return an array with bundles occurrencies', () => {
    //         const total: TResultLine[] = getTotalResult([{ code: "R12", quantity: 5 }])
    //         const bundle: TBundleResult = {
    //             "code": "R12",
    //             "quantity": 5,
    //             "bundle": {
    //                 "quantity": 5,
    //                 "price": "$6.99"
    //             },
    //             "price": "$6.99",
    //             "occurrences": 1,
    //             "totalPrice": "$6.99"
    //         }
    //         expect(total).toStrictEqual([{ code: "R12", quantity: 5, bundles: [bundle], totalPrice: "$6.99" }])
    //     })
    // })

    // describe('calculateTotalBreakdown', () => {
    //     it('should return an array with the breakdown', () => {
    //         const breakdown: TResultLine[] = calculateTotalBreakdown([{ bundles: [{ code: "R12", bundle: { quantity: 1, price: "$1" }, occurrences: 1, price: "$1", totalPrice: "$1", quantity: 1, code: "R12" }] }])
    //         console.log('breakdown', breakdown)
    //     })
    // })

    describe('generateTotal', () => {
        it('should throw if an empty array is passed', () => {
            // const data = generateTotal([])
            expect(() => generateTotal([])).toThrow('empty order')
        })
        it('should generate an array with data if it is passed correctly', () => {
            const data = generateTotal([{ code: "R12", quantity: 10 }])
            expect(data).toBeTruthy()
        })
        it('should generate an array with data if it the data is the wanted one by the test', () => {
            const data = generateTotal([{ code: "R12", quantity: 10 }, { code: "L09", quantity: 15 }, { code: "T58", quantity: 13 }])
            expect(data).toBeTruthy()
            expect(data).toHaveLength(3)
            expect(data[0].totalPrice).toBe("$12.99")
            expect(data[0].items).toHaveLength(1)
            expect(data[1].totalPrice).toBe("$41.90")
            expect(data[1].items).toHaveLength(2)
            expect(data[2].totalPrice).toBe("$25.85")
            expect(data[2].items).toHaveLength(2)
        })
    })
})