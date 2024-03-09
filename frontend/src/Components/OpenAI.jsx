import { useState, useEffect } from 'react';
import { MdMenuBook } from "react-icons/md";

export function OpenAI() {
    const [libroBuscado, setLibroBuscado] = useState('');
    const [busquedaActivada, setBusquedaActivada]=useState(true);
    const [autor, setAutor]=useState('')
    

    useEffect(() => {

                
        fetch('http://localhost:4500/books/'+libroBuscado)
        .then(response => response.json())
        .then(data=>{
            if(data.length>0) {
                setAutor(data[0].author)    
                setLibroBuscado(data[0].name)  
            }
            else{
                
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
                            content: `El autor del libro ${libroBuscado} es (Usa maximo 4 palabras en tu respuesta):`
                        }
                    ],
                    temperature: 0
                })
            })
                .then(response => response.json())
                .then(dataIA => {
                    setAutor(dataIA.choices[0].message.content);
                    fetch('http://localhost:4500/books', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: libroBuscado,
                            author: dataIA.choices[0].message.content
                        })
                    })
                    .then(response => response.json())
                    .then(dataSave => {
                        console.log('Book and author saved successfully:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                })
            }
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