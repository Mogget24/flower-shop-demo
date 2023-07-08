export interface IFlowerShopBundle {
    quantity: number;
    price: string;
}

export interface IFlowerShopData {
    name: string;
    code: string;
    bundles: IFlowerShopBundle[]
    image?: string;
    defaultValue: number; // testing purposes only
}