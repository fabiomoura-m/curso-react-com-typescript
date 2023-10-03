import { ReactNode } from 'react';

interface ButtonProps {
    tamanho?: string;
    children?: ReactNode;
    onClick?: () => void;
}

type ButtonProps2 = React.PropsWithChildren<{
    tamanho?: string;
    onClick?: () => void;
}>;

type ButtonProps3 = React.ComponentProps<'button'> & {
    tamanho?: string;
}; // Informa ao botão que o elemento pode receber qualquer propriedade que o elemento button possua por padrão e estendemos o tamanho.

const Button = ({ tamanho, children, ...props }: ButtonProps3) => {
    return (
        <button style={{ fontSize: tamanho }} {...props}>
            {children}
        </button>
    );
};

export default Button;
