export interface IFlowerShopBundle {
    quantity: number;
    price: string;
}

export interface IFlowerShopData {
    name: string;
    code: string;
    bundles: IFlowerShopBundle[]
    image?: string;
    // defaultValue: number; // testing purposes only
}

export type TBundleResult = {
    bundle: IFlowerShopBundle;
    occurrences: number,
    code: string,
    quantity: number,
    totalPrice?: string,
    price: string
}

export type TGenerateToolData = { code: string, quantity: number }

export type TCheckGivenData = (data: TGenerateToolData[]) => string[]

export type TResultLine = {
    code: string;
    quantity: number;
    bundles: TBundleResult[];
    totalPrice: string;
};

export type TGetTotalResult = (data: TGenerateToolData[]) => TResultLine[]

export type TBreakdown = {
    quantity: number,
    code: string,
    totalPrice: string,
    items: {
        occurrences: number,
        quantity: number,
        price: string
    }[]
}[]

export type TGenerateTool = (data: TGenerateToolData[]) => TBreakdown