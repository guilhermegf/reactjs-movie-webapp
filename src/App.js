import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [filmes, setFilmes] = useState({ Search: [] });
  const [searchTerm, setSearchTerm] = useState('matrix'); // Estado para armazenar o termo de busca

  const fetchFilmes = async (term) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=72de31d&s=${term}&type=movie&plot=full`);
      const data = await response.json();

      if (data.Response === "True") {
        setFilmes(data);
      } else {
        console.error('Erro ao buscar filmes:', data.Error);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  useEffect(() => {
    fetchFilmes(searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchFilmes(searchTerm);
  };

  return (
    <div className="App">
      <div className="boxFilmes">
        <h2>Buscar filmes: </h2>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Digite o nome do filme..." 
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="filmesGrid">
          {filmes.Search.map((val) => (
            <div className="filmeCard" key={val.imdbID}>
              <h3>{val.Title}</h3>
              <img src={val.Poster} alt={val.Title} />
              <p><strong>Ano:</strong> {val.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
