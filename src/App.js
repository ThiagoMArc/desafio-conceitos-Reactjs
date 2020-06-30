import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepository(response.data));
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      })
      .then((response) => setRepository([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then((response) => setRepository([...repositories].splice(id, 1)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
