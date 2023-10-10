import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';
import Exercicio from './exercicios/exercicioUseState/ExerciciouseState';
import videoSrc from './video.mp4';
import useLocalStorage from './hooks/useLocalStorage';
import useFetch from './hooks/useFetch';
import { UiContextProvider } from './UiContext';
import { Header } from './Header';
import ExercicioUseContext from './exercicios/exerciciouseContext/ExercicioUseContext';

// tipando caso o button recebesse o total e setTotal
type ButtonExample = {
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
};

function App() {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState('');

    function incrementar() {
        setTotal(total => total + 1);
    }

    const video = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    function forward() {
        if (!video.current) return;
        video.current.currentTime += 2;
    }

    function changePlayBackRate(speed: number) {
        if (!video.current) return;
        video.current.playbackRate = speed;
    }

    function mute() {
        if (!video.current) return;
        video.current.muted = !video.current.muted;
    }

    async function pictureInPicture() {
        if (!video.current) return;
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            await video.current.requestPictureInPicture();
        }
    }

    const [volume, setVolume] = useLocalStorage('volume', '0');

    useEffect(() => {
        if (!video.current) return;

        const volumeNumber = Number(volume);

        // a propriedade video.current.volume aceita valores apenas de 0 a 1, se receber um valor maior que um quebra a aplicação.
        if (volumeNumber >= 0 && volumeNumber <= 1) {
            video.current.volume = volumeNumber;
        }
    }, [volume]);

    // AULA HOOK useFETCH

    type Produto = {
        id: string;
        nome: string;
        preco: number;
        quantidade: number;
        descricao: string;
        internacional: boolean;
    };

    const [id, setId] = useState('p001');

    const produtos = useFetch<Produto[]>('https://data.origamid.dev/produtos');
    const produto = useFetch<Produto>(
        `https://data.origamid.dev/produtos/${id}`,
        {
            cache: 'force-cache'
        }
    );

    // AULA useContext

    return (
        <UiContextProvider>
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

                {/* Eventos */}
                <Checkbox label="Termos e Condições" />

                {/* Exercício useState */}
                <p>Exercício useState</p>
                <Exercicio />

                {/* useRef */}
                <div className="flex">
                    {playing ? (
                        <button onClick={() => video.current?.pause()}>
                            Pause
                        </button>
                    ) : (
                        <button onClick={() => video.current?.play()}>
                            Play
                        </button>
                    )}
                    <button onClick={forward}>+ 2s</button>
                    <button onClick={() => changePlayBackRate(1)}>1x</button>
                    <button onClick={() => changePlayBackRate(2)}>2x</button>
                    <button onClick={pictureInPicture}>PiP</button>
                    <button onClick={mute}>Mute</button>
                </div>
                <video
                    controls
                    ref={video}
                    src={videoSrc}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                ></video>
                {/* CustomHook useLocalStorage */}
                <div className="flex">
                    {volume}
                    <button onClick={() => setVolume('0')}>Volume 0</button>
                    <button onClick={() => setVolume('0.5')}>Volume 50%</button>
                    <button onClick={() => setVolume('1')}>Volume 100%</button>
                </div>
                {/* useFetch */}
                <h2>AULA UseFetch</h2>
                <section className="flex">
                    <div>
                        {produtos.data &&
                            produtos.data.map(produto => (
                                <button
                                    style={{ fontSize: '1rem' }}
                                    key={produto.id}
                                    onClick={() => setId(produto.id)}
                                >
                                    {produto.id}
                                </button>
                            ))}
                    </div>
                    <div>
                        {produto.loading && <div>Carregando...</div>}
                        {produto.data && (
                            <ul>
                                <li>ID: {produto.data.id}</li>
                                <li>Nome: {produto.data.nome}</li>
                                <li>Descrição: {produto.data.descricao}</li>
                                <li>Quantidade: {produto.data.quantidade}</li>
                                <li>Preço: {produto.data.preco}</li>
                            </ul>
                        )}
                    </div>
                </section>
            </div>
            {/* AULA USECONTEXT */}
            <Header />

            {/* Exercicio useContext */}
            <h1>Exercicio useContext</h1>
            <ExercicioUseContext />
        </UiContextProvider>
    );
}

export default App;
