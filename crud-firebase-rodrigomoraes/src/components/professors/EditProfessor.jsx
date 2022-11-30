import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FirebaseContext from "../../utils/FirebaseContext";
import ProfessorService from "../../services/ProfessorService";

const EditProfessorPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(value) => <EditProfessor firebase={value} />}
    </FirebaseContext.Consumer>
  );
};

const EditProfessor = (props) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [salary, setSalary] = useState(0.0);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    ProfessorService.retrieve(
      props.firebase.getFirestoreDb(),
      (professor) => {
        setName(professor.name);
        setCourse(professor.course);
        setSalary(professor.salary);
      },
      params.id
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const professorUpdated = { name, course, salary };
    ProfessorService.update(
      props.firebase.getFirestoreDb(),
      (result) => {
        navigate("/listProfessor");
      },
      params.id,
      professorUpdated
    );
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Editar Professor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu nome"
            value={name === null || name === undefined ? "" : name}
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
            value={course ?? ""}
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
            value={salary ?? 0.0}
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          />
        </div>
        <div className="form-group" style={{ marginTop: 15 }}>
          <input
            type="submit"
            value="Editar Professor"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfessorPage;
