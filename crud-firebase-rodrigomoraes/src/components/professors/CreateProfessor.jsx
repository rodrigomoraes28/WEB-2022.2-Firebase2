import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FirebaseContext from "../../utils/FirebaseContext";
import ProfessorService from "../../services/ProfessorService";

const CreateProfessorPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(value) => <CreateProfessor firebase={value} />}
    </FirebaseContext.Consumer>
  );
};

const CreateProfessor = (props) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [salary, setSalary] = useState(0.0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProfessor = { name, course, salary };
    ProfessorService.add(
      props.firebase.getFirestoreDb(),
      (id) => {
        alert(`Professor ${id} adicionado!`);
        navigate("/listProfessor");
      },
      newProfessor
    );
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Criar Professor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu nome"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Curso: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu curso"
            onChange={(event) => {
              setCourse(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Salario: </label>
          <input
            type="number"
            step="any"
            className="form-control"
            placeholder="Digite seu Salario"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          />
        </div>
        <div className="form-group" style={{ marginTop: 15 }}>
          <input
            type="submit"
            value="Criar Professor"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProfessorPage;
