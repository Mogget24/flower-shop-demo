interface IFlowerShopBundle {
    quantity: number;
    price: string;
}

export interface IFlowerShopData {
    name: string;
    code: string;
    bundles: IFlowerShopBundle[]
}