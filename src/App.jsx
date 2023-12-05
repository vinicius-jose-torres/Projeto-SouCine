
import React, { useState } from 'react';
import './App.css';

function App() {
  const [dados, setDados] = useState([]);
  const [nomeFilme, setNomeFilme] = useState("");
  const apiKey = 'c8d2153e';

  const buscarFilmes = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${nomeFilme}`);
      const json = await response.json();
      setDados(json.Search || []);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const exibirDetalhes = async (id) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
      const json = await response.json();

      // Formatação das informações para melhor visualização
      const formattedDetails = `
        Título: ${json.Title}
        Ano: ${json.Year}
        Diretor: ${json.Director}
        Gênero: ${json.Genre}
        Nota: ${json.imdbRating}
        Enredo: ${json.Plot}
        Poster: ${json.Poster}
      `;

      // Abre os detalhes em uma nova aba
      const telaDeDetalhes = window.open('', '_blank');
      telaDeDetalhes.document.write(formattedDetails);

    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <h1>SouCine</h1>
      <form onSubmit={(e) => { e.preventDefault(); buscarFilmes(); }}>
        <label>
          Digite o nome do filme:
          <input
            type="text"
            value={nomeFilme}
            onChange={(e) => setNomeFilme(e.target.value)}
            placeholder="Ex: Titanic"
          />
        </label>
        <button type="submit">Pesquisar</button>
      </form>

      {dados.length > 0 && (
        <ul>
          {dados.map((filme) => (
            <li key={filme.imdbID} onClick={() => exibirDetalhes(filme.imdbID)}>
              <h2>{filme.Title}</h2>
              <p>Ano: {filme.Year}</p>
              {filme.Poster !== "N/A" && <img src={filme.Poster} alt={`${filme.Title} Poster`} />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
