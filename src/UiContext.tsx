import { createContext, useContext, useState } from 'react';

type IUiContext = {
    dark: boolean;
    setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UiContext = createContext<IUiContext | null>(null);

export const useUi = () => {
    const context = useContext(UiContext);
    if (context === null) {
        throw new Error('useContext deve estar dentro do Provider');
    }
    return context;
};

export const UiContextProvider = ({ children }: React.PropsWithChildren) => {
    const [dark, setDark] = useState(false);

    return (
        <UiContext.Provider value={{ dark, setDark }}>
            {children}
        </UiContext.Provider>
    );
};
