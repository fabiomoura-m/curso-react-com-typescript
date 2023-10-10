import { useUser } from './context/UserContext';

export default function Content() {
    const { data, loading } = useUser();

    if (loading) return <p>Carregando...</p>;
    if (!data) return null;
    return (
        <div>
            <h3>Preferências</h3>
            <p>Qualidade: {data.preferencias.qualidade}</p>
            <p>Playback: {data.preferencias.playback}</p>
            <p>Volume: {data.preferencias.volume}</p>
        </div>
    );
}
