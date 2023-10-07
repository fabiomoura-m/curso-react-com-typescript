import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';
import Exercicio from './exercicios/exercicioUseState/ExerciciouseState';
import videoSrc from './video.mp4';
import useLocalStorage from './hooks/useLocalStorage';

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
                    <button onClick={() => video.current?.play()}>Play</button>
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
        </div>
    );
}

export default App;
