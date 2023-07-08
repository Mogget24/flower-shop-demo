import { useEffect, useState } from 'react'
import { useCart } from '../../../useCart'
import './FlowerCardForm.scss'
import { checkGivenData } from '../../../shared/flower-shop-tools'
import Button from '../../button/Button'
import { IFlowerShopBundle } from '../../../shared/flower-shop-tools.types'

interface Props {
    code: string;
    bundles: IFlowerShopBundle[];
    defaultValue: number;
}
const FlowerCardForm = (props: Props) => {

    const { setCartFromData, cart, removeItemFromCartByCode } = useCart()
    // console.log('cartContext', setCartFromData)
    const [quantity, setQuantity] = useState<number>(1)
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    // only for fast-ing the tests
    useEffect(() => {
        setQuantity(props.defaultValue)
    }, [props.defaultValue])
    useEffect(() => {
        onClickAddToCart()
    }, [quantity])

    const onClickAddToCart = () => {
        const errors = checkGivenData([{ code: props.code, quantity }])
        if (errors.length > 0) {
            setValidationErrors(errors)
        } else {
            // valid
            setValidationErrors([])
            setCartFromData({ code: props.code, quantity })
        }
    }

    // Add a flag for toggling the buttons
    const isAddedToCart = cart?.find(cartItem => cartItem.code === props.code)

    console.log('cart', cart)

    return <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }} className="FlowerCardForm">

        {/* I would put this into a different component but we're actually using an input only here for this mini demo */}
        <div className="form-element">
            <label htmlFor={`quantity-${props.code}`}>
                <span className="label-text">Desidered Quantity</span>
                <input type="number" name="quantity" id={`quantity-${props.code}`} value={quantity}
                    onChange={(event) => setQuantity(+event.target.value)} />
            </label>
            {/* <select name="quantity" id={`quantity-${props.code}`} value={quantity}
                onChange={(event) => setQuantity(+event.target.value)}>
                <option value={0}></option>
                {props.bundles.map(bundle => {
                    return <option value={bundle.quantity}>{bundle.quantity}</option>
                })}
            </select> */}
            {validationErrors.map(error => {
                return <p role="alert" aria-live="assertive" className="error-message">{error}</p>
            })}
        </div>

        {!!isAddedToCart ?
            <Button className="delete" onClick={() => removeItemFromCartByCode(props.code)}>Remove from cart</Button> :
            <Button type="submit" onClick={() => onClickAddToCart()}>Add to cart</Button>
        }
    </form>
}

export default FlowerCardForm