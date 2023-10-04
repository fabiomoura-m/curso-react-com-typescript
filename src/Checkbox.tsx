import { useState } from 'react';

const Checkbox = ({ label }: { label: string }) => {
    const [value, setValue] = useState(false);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setValue(event.currentTarget.checked);
    };

    // como é uma função simples, podemos utilizar uma função anonima diretamente no input, dessa maneira o react já vai inferir o tipo

    return (
        <label
            style={{
                padding: '1rem',
                border: value ? '2px solid #8d3' : '2px solid #f70'
            }}
        >
            <input
                type="checkbox"
                checked={value}
                onChange={({ currentTarget }) =>
                    setValue(currentTarget.checked)
                }
            />
            {label}
        </label>
    );
};

export default Checkbox;
