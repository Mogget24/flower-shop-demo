import { useContext, useState } from "react";
import { IFlowerShopData } from "../../shared/flower-shop-tools.types";

import './FlowerCard.scss'
import { checkGivenData, TGenerateToolData, TGetTotalResult } from "../../shared/flower-shop-tools";
import Button from "../button/Button";
import { useCart } from "../../useCart";
import FlowerCardForm from "./flowerCardForm/FlowerCardForm";

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
        <FlowerCardForm code={props.code} bundles={props.bundles} defaultValue={props.defaultValue} />
    </li>
}

export default FlowerCard