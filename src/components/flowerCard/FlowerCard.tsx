import { IFlowerShopData } from "../../shared/flower-shop-tools.types";
import FlowerCardForm from "./flowerCardForm/FlowerCardForm";

import './FlowerCard.scss'

interface Props extends IFlowerShopData {
    // onSetData: (data: TGenerateToolData) => void
}
const FlowerCard = (props: Props) => {

    // dynamic import image needed by Vite
    const imageSrc = new URL(`../../assets/${props.image}`, import.meta.url).href

    return <li className="FlowerCard">
        <div className="info-wrapper">
            <img src={imageSrc} alt="" />
            <div className="info">
                <h2>{props.name}</h2>
                <h3>Code: {props.code}</h3>
            </div>
        </div>
        <div className="bundles-wrapper">
            <h2>Bundles</h2>
            <ul>
                {props.bundles?.map((bundle, bundleIndex) => {
                    return <li key={`bundle-${props.code}-${bundleIndex}`}>
                        {bundle.quantity} x {bundle.price}
                    </li>
                })}
            </ul>
        </div>
        <FlowerCardForm code={props.code} bundles={props.bundles} />
    </li>
}

export default FlowerCard