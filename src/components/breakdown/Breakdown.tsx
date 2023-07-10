import { useState } from "react";
import { generateTotal } from "../../shared/flower-shop-tools";
import { TBreakdown } from "../../shared/flower-shop-tools.types";
import { useCart } from "../../useCart";
import Button from "../button/Button";

import './Breakdown.scss'

const Breakdown = () => {

    const { cart } = useCart();

    const [calculatedBreakdown, setCalculatedBreakdown] = useState<TBreakdown | null>(null)

    const onClickPlaceOrder = () => {
        // console.log('onClickPlaceOrder', cart)
        if (!!cart) {
            const breakdown = generateTotal(cart)
            // console.log('breakdown', breakdown)
            setCalculatedBreakdown(breakdown)
        }
    }

    //style={{ position: 'fixed', bottom: "1rem", right: "1rem" }}
    return <div className="Breakdown">
        <h2>Breakdown</h2>
        <Button onClick={onClickPlaceOrder}>Calculate breakdown</Button>

        {calculatedBreakdown && <ul className="breakdown-outer">
            {calculatedBreakdown.map(line => {
                return <li key={`breakdown-${line.code}`}>
                    {line.quantity} {line.code} {line.totalPrice}

                    <ul className="breakdown-inner">
                        {line.items.map((item, itemIndex) => {
                            return <li key={`breakdown-${line.code}-${itemIndex}`}>
                                {item.occurrences} x {item.quantity} {item.price}
                            </li>
                        })}
                    </ul>
                </li>
            })}
        </ul>}
    </div>
}

export default Breakdown