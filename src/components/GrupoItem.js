import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import BackendConnection from '../api/BackendConnection';

function GrupoItem(props) {
  const { grupoHorario, grupo, updateGrupo, confirmDelete } = props;
  const { idgrupo, materia_idmateria } = grupo;

  const [materia, setMateria] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const materiaAux = await BackendConnection.getMateriasById(materia_idmateria);
    setMateria(materiaAux[0]);
  };

  return (
    <div>
      <CardItem
        text={`Grupo: ${idgrupo}`}
        secondaryText={materia? `Materia: ${materia.namemateria}`: ''}
        showEditIcon={true}
        showDeleteIcon={true}
        editClick={() => updateGrupo(grupoHorario)}
        deleteClick={() => confirmDelete(grupoHorario)}
      />
      <div style={{ height: 20 }} />
    </div>
  );
}

export default GrupoItem;
