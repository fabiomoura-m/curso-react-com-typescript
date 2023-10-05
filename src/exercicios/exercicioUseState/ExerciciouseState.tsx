// Interface da API: https://data.origamid.dev/vendas/
// <!-- Essa API possui dados de hoje até 90 dias atrás -->

import { useState, useEffect } from 'react';
import Input from './Input';

// 1 - Utilize a API: `https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`
// 2 - Inicio/Final é uma string do tipo data YYYY-MM-DD (padrão de saída do input tipo date)
// 3 - Crie ou reutilize o componente Input.tsx (Label com Input) das aulas anteriores
// 4 - Crie 3 estados reativos em App.tsx: data, inicio, final
// 5 - Utilize o componente Input.tsx para modificar o estado de inicio/final
// 6 - Crie um efeito que ocorrerá toda vez que inicio/final mudar. Se existir inicio/final, faça o fetch da API e popule o estado de data com o resultado.
// 7 - Caso data seja diferente de null, mostre na tela o nome e o status de cada venda do período selecionado

type VendaProps = {
    id: string;
    nome: string;
    preco: number;
    status: string;
    pagamento: string;
    parcelas: null | number;
    data: string;
};

const Exercicio = () => {
    const [data, setData] = useState<VendaProps[] | null>(null);
    const [inicio, setInicio] = useState('');
    const [final, setFinal] = useState('');

    const fetchData = async (inicio: string, final: string) => {
        const response = await fetch(
            `https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`
        );
        const data = await response.json();
        setData(data);
    };

    useEffect(() => {
        if (inicio !== '' && final !== '') {
            fetchData(inicio, final);
        }
    }, [inicio, final]);

    return (
        <div>
            <Input
                label="Data Início"
                id="inicio"
                type="date"
                value={inicio}
                setState={setInicio}
            />
            <Input
                label="Data Final"
                id="final"
                type="date"
                value={final}
                setState={setFinal}
            />
            <ul>
                {data &&
                    data.map(venda => (
                        <li key={venda.id}>
                            {venda.nome}: {venda.status}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Exercicio;
