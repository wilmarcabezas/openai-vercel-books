import { useState, useEffect } from 'react';
import { MdMenuBook } from "react-icons/md";

export function OpenAI() {
    const [libroBuscado, setLibroBuscado] = useState('');
    const [busquedaActivada, setBusquedaActivada]=useState(true);
    const [autor, setAutor]=useState('')

    useEffect(() => {

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `El autor del libro ${libroBuscado} es:`
                    }
                ],
                temperature: 0
            })
        })
            .then(response => response.json())
            .then(data => {
                setAutor(data.choices[0].message.content);
            })

    }, [busquedaActivada])


    const cargarLibroBuscado = (event) => {
        setLibroBuscado(event.target.value);
    }

    const buscarLibro = () => {
        setBusquedaActivada(!busquedaActivada)    
    }

    return (
        <>
            <h1>Encuentra el autor</h1>
            <input
                type="text" name="libro"
                onChange={cargarLibroBuscado}
                id="libro" />
            <button onClick={buscarLibro}>
                <MdMenuBook />
            </button>
            <hr />
            El autor del libro <b>{libroBuscado}</b> es: {autor}
        </>
    )
}