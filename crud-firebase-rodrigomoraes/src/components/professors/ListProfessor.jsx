import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FirebaseContext from "../../utils/FirebaseContext";
import ProfessorService from "../../services/ProfessorService";

const ListProfessorPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(value) => <ListProfessor firebase={value} />}
    </FirebaseContext.Consumer>
  );
};

const ListProfessor = (props) => {
  const [professors, setProfessors] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    ProfessorService.list_on_snapshot(
      props.firebase.getFirestoreDb(),
      (professors) => {
        setProfessors(professors);
      }
    );
  }, []);

  function deleteProfessorV2(id) {
    if (window.confirm("Deseja excluir?")) {
      ProfessorService.delete(
        props.firebase.getFirestoreDb(),
        () => {
          let professorsTemp = professors;
          for (let i = 0; i < professorsTemp.length; i++) {
            if (professorsTemp[i].id === id) {
              professorsTemp.splice(i, 1);
              break;
            }
          }
          setProfessors(professorsTemp);
          setReload(!reload);
        },
        id
      );
    }
  }

  function deleteProfessor(id) {
    if (window.confirm("Deseja excluir?")) {
      ProfessorService.delete(
        props.firebase.getFirestoreDb(),
        () => {
          let professorsResult = professors.filter((professor) => professor.id !== id);
          setProfessors(professorsResult);
        },
        id
      );
    }
  }

  const generateTableBody = () => {
    return professors.map((element, index) => {
      element.key = index;
      return (
        <tr>
          <td>{element.id}</td>
          <td>{element.name}</td>
          <td>{element.course}</td>
          <td>{element.ira}</td>
          <td>
            <Link to={"/editProfessor/" + element.id} className="btn btn-primary">
              Editar
            </Link>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteProfessorV2(element.id)}
            >
              Apagar
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Listar Professor</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>Salario</th>
            <th colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>{generateTableBody()}</tbody>
      </table>
    </div>
  );
};

export default ListProfessorPage;
