type InputProps = React.ComponentProps<'input'> & {
    label: string;
    id: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ label, id, setState, ...props }: InputProps) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <label htmlFor={id}>{label}</label>
            <input
                name={id}
                id={id}
                type="text"
                onChange={({ currentTarget }) => setState(currentTarget.value)}
                {...props}
            />
        </div>
    );
};

export default Input;
