import { useState } from 'react';
import Button from './Button';
import Input from './Input';

function App() {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState('');

    function incrementar() {
        setTotal(total => total + 1);
    }

    return (
        <div>
            <p>Total: {total}</p>
            <Button
                id="botao-principal"
                className="btn"
                onClick={incrementar}
                tamanho={'1.25rem'}
            >
                Incrementar
            </Button>
            {/* Exercício Input */}
            <p>Início da Viagem: {data}</p>
            <Input label="Nome" id="nome" />
            <Input label="Email" id="email" type="email" />
            <Input
                value={data}
                onChange={e => setData(e.currentTarget.value)}
                label="Início da Viagem"
                id="date"
                type="date"
            />
        </div>
    );
}

export default App;
