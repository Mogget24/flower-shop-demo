/// <reference types="vitest" />

import { describe, expect, it } from "vitest";
import { checkGivenData, generateTotal, flowerShopData, getMinimumQuantityOfGivenFlowerCode, getBundleCombinationOfGivenFlower, getCombinations, getTotalResult, calculateTotalBreakdown } from './flower-shop-tools'

describe('flower-shop-tools', () => {

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

    // describe('getCombinations', () => {
    //     it('should do something', () => {
    //         const combinations = getCombinations(13, [3, 5, 9])
    //         console.log('combinations', combinations)
    //         expect(false)
    //     })
    // })

    describe('getBundleCombinationOfGivenFlower', () => {
        it('should return an array of one bundle with one occurrency if given code is R12 and quantity is 5', () => {
            const bundles = getBundleCombinationOfGivenFlower("R12", 5)
            expect(bundles).toStrictEqual([{ code: "R12", quantity: 5, bundle: { quantity: 5, price: "$6.99" }, occurrencies: 1 }])
        })
        it('should return an array of one bundle with one occurrency if given code is R12 and quantity is 10', () => {
            const bundles = getBundleCombinationOfGivenFlower("R12", 10)
            expect(bundles).toStrictEqual([{ code: "R12", quantity: 10, bundle: { quantity: 10, price: "$12.99" }, occurrencies: 1 }])
        })
        it('should return an array of 2 bundles, 2x5 and 1x3 if given code is T58 and quantity is 13', () => {
            const bundles = getBundleCombinationOfGivenFlower("T58", 13)
            console.log('bundles', bundles)
            expect(bundles).toStrictEqual([{ code: "T58", quantity: 13, bundle: { quantity: 5, price: "$9.95" }, occurrencies: 2 }, { code: "T58", quantity: 13, bundle: { quantity: 3, price: "$5.95" }, occurrencies: 1 }])
        })
    })

    describe('checkGivenData', () => {
        it('should return an array with one element which is an error saying "empty order"', () => {
            const errors = checkGivenData([])
            expect(errors).toStrictEqual(["empty order"])
        })

        it('should return an array with one error saying "given code is invalid"', () => {
            const errors = checkGivenData([{ code: "test", quantity: 1 }])
            expect(errors).toStrictEqual(["given code is invalid"])
        })

        it('should return an array with one error saying "the is no combination of bundles for the given input"', () => {
            const errors = checkGivenData([{ code: "R12", quantity: 6 }])
            expect(errors).toStrictEqual(["the is no combination of bundles for the given input"])
        })
    })

    describe('getTotalResult', () => {
        it('should return an array with bundles occurrencies', () => {
            const total = getTotalResult([{ code: "R12", quantity: 5 }])
            expect(total).toStrictEqual([{ code: "R12", quantity: 5, bundle: { quantity: 5, price: '$6.99' }, occurrencies: 1 }])
        })
    })

    // describe('calculateTotalBreakdown', () => {
    //     it('should return an array with the breakdown', () => {
    //         const breakdown = calculateTotalBreakdown([{ code: "R12", quantity: 5, bundle: { quantity: 5, price: '$6.99' }, occurrencies: 1 }])
    //         console.log('breakdown', breakdown)
    //     })
    // })

    describe('generateTotal', () => {
        it('should throw if an empty array is passed', () => {
            // const data = generateTotal([])
            expect(() => generateTotal([])).toThrow('empty order')
        })
    })
})
