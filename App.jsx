import { useState } from 'react'
import api from './services/api';
import './app.css'



function App() {

  const [cep,setCep] = useState('')
  const [retorno, setRetorno] = useState({})
  
  async function Search(){
    
    if(cep === ''){
      alert('Coloque algum CEP!')
      return;
    }

    try{

      const response = await api.get(`${cep}/json`) 
      setRetorno(response.data)
      setCep('')
    }
    catch{
      alert('Ops, erro ao buscar...')
      setCep('')
    }
  }

  return (
    <>
    <div className='container'>
      <h1>
        Buscador de Cep!
      </h1>

      <input 
      type='text'
      placeholder='Exemplo:38400-322'
      value={cep}
      onChange={(event) => setCep(event.target.value)}
      />

      <button onClick={Search}>
        Buscar
      </button>

      {Object.keys(retorno).length > 0 && (
         <div className='complementos'>
          <h2>CEP: {retorno.cep}</h2>
          <span>{retorno.logradouro}</span>
          <span>Complemento: {retorno.complemento}</span>
          <span>{retorno.bairro}</span>
          <span>{retorno.localidade} - {retorno.uf}</span>
       </div>
      )}

      </div>
    </>
  )
}

export default App
