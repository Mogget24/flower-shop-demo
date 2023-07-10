import { createContext, useContext, useState } from "react";
import { TGenerateToolData } from "./shared/flower-shop-tools.types";

type TSetCartFromData = (data: TGenerateToolData) => void
type TremoveItemFromCartByCode = (code: string) => void
interface ICartContext {
    cart: TGenerateToolData[] | null;
    // setCart: React.Dispatch<React.SetStateAction<TGenerateToolData[]>>;
    setCartFromData: TSetCartFromData;
    removeItemFromCartByCode: TremoveItemFromCartByCode;
}
export const CartContext = createContext<ICartContext>({
    cart: [],
    // setCart: () => { },
    setCartFromData: () => { },
    removeItemFromCartByCode: () => { },
});

export const useCart = () => {
    const cartContext = useContext(CartContext);
    return cartContext;
};

interface Props {
    children: React.ReactNode
}
export const CartProvider = (props: Props) => {

    const [cart, setCart] = useState<TGenerateToolData[]>([])

    const setCartFromData: TSetCartFromData = data => {
        setCart(previousCart => {
            const oldDataWithoutCode = previousCart?.filter(cart => cart.code !== data.code)
            return [...oldDataWithoutCode, data]
        })
    }

    const removeItemFromCartByCode: TremoveItemFromCartByCode = code => {
        // console.log('removeItemFromCartByCode', code)
        setCart(previousCart => {
            const oldDataWithoutCode = previousCart?.filter(cart => cart.code !== code)
            return [...oldDataWithoutCode]
        })
    }

    return <CartContext.Provider value={{ cart, setCartFromData, removeItemFromCartByCode }}>
        {props.children}
    </CartContext.Provider>
}