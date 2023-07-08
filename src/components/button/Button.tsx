import './Button.scss'

interface Props {
    type?: 'button' | 'submit';
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: 'delete';
}
const Button = (props: Props) => {
    return <button className={["Button", props.className].join(' ')} type={props.type ?? 'button'} onClick={props.onClick} style={props.style}>
        {props.children}
    </button>
}

export default Button