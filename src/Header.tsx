import { useContext } from 'react';
import { UiContext, useUi } from './UiContext';

export const Header = () => {
    const { dark, setDark } = useUi();

    return (
        <header style={{ background: dark ? '#000' : '#fff' }}>
            <h1 style={{ color: dark ? '#fff' : '#000' }}>HEADER</h1>
            <button onClick={() => setDark(value => !value)}>
                {dark ? 'Light' : 'Dark'} Mode
            </button>
        </header>
    );
};
