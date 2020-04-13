import React, { useState, useEffect } from 'react';

import api from './services/api';
import "./styles.css";


function App() {
  const [repo_arr, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setProjects(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `novo projeto ${Date.now()}`,
      url: "https://github.com/mrChernicharo/desafio01-node",
      techs: ["NodeJS", "ReactJS", "React Native"],
      likes: 0,
    });
    const repo = response.data;
    setProjects([...repo_arr, repo]);
  }

  async function handleRemoveRepository(id) {
      try {
        await api.delete(`repositories/${id}`);
        
      setProjects(repo_arr.filter(repo => repo.id !== id));

    } catch(err){
        alert('Erro ao deletar o caso')
    }
  }



  return (
    <div>

      <ul data-testid="repository-list">
      
      {repo_arr.map(repo => 
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>)}  
      </ul>
  
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}


export default App;
