export type TCode = "R12" | "L09" | "T58";

export interface IFlowerShopBundle {
    quantity: number;
    price: string;
}

export interface IFlowerShopData {
    name: string;
    code: TCode;
    bundles: IFlowerShopBundle[]
    image?: string;
    // defaultValue: number; // testing purposes only
}

export type TBundleResult = {
    bundle: IFlowerShopBundle;
    occurrences: number,
    code: TCode,
    quantity: number,
    totalPrice?: string,
    price: string
}

export type TGenerateToolData = { code: TCode, quantity: number }

export type TCheckGivenData = (data: TGenerateToolData[]) => string[]

export type TResultLine = {
    code: TCode;
    quantity: number;
    bundles: TBundleResult[];
    totalPrice: string;
};

export type TGetTotalResult = (data: TGenerateToolData[]) => TResultLine[]

export type TBreakdown = {
    quantity: number,
    code: TCode,
    totalPrice: string,
    items: {
        occurrences: number,
        quantity: number,
        price: string
    }[]
}[]

export type TGenerateTool = (data: TGenerateToolData[]) => TBreakdown