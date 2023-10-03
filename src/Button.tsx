import { ReactNode } from 'react';

interface ButtonProps {
    tamanho?: string;
    children?: ReactNode;
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} style={{ fontSize: props.tamanho }}>{props.children}</button>
    );
};

export default Button;
