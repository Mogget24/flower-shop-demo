/// <reference types="vitest" />

import { describe, expect, it } from "vitest";
import { checkGivenData, generateTotal, flowerShopData, getMinimumQuantityOfGivenFlowerCode } from './flower-shop-tools'

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

    describe('checkGivenData', () => {
        it('should return an array with one element which is an error saying "empty order"', () => {
            const errors = checkGivenData([])
            expect(errors).toStrictEqual(["empty order"])
        })

        it('should return an array with one error saying "given code is invalid"', () => {
            const errors = checkGivenData([{ code: "test", quantity: 1 }])
            expect(errors).toStrictEqual(["given code is invalid"])
        })
    })

    describe('generateTotal', () => {
        it('should throw if an empty array is passed', () => {
            // const data = generateTotal([])
            expect(() => generateTotal([])).toThrow('empty order')
        })
    })
})