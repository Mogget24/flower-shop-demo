import { generateTotal } from "../../shared/flower-shop-tools";
import { useCart } from "../../useCart";
import Button from "../button/Button";

const Breakdown = () => {

    const { cart } = useCart();

    const onClickPlaceOrder = () => {
        console.log('onClickPlaceOrder', cart)
        if (!!cart) {
            const breakdown = generateTotal(cart)
            console.log('breakdown', breakdown)
        }
    }

    return <div className="Breakdown">
        Breakdown
        <Button onClick={onClickPlaceOrder} style={{ position: 'fixed', bottom: "1rem", right: "1rem" }}>Place order</Button>
    </div>
}

export default Breakdown