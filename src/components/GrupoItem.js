import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import BackendConnection from '../api/BackendConnection';

function GrupoItem(props) {
  const { grupoHorario, updateGrupo, confirmDelete } = props;
  console.log('grupoHorario', grupoHorario);

  const [horario, setHorario] = useState(null);
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { dia, grupo_idgrupo, horario_idhorario, idgrupohorarios, users_idusers1 } = grupoHorario;

    const grupoAux = await BackendConnection.getGruposbyId(grupo_idgrupo);

    console.log('grupoAux', grupoAux[0]);

    const { materia_idmateria } = grupoAux[0];

    const horarioAux = await BackendConnection.getHorariosById(horario_idhorario);
    console.log('horarioAux', horarioAux[0]);

    const materiaAux = await BackendConnection.getMateriasById(materia_idmateria);
    console.log('materiaAux', materiaAux[0]);

    setHorario(horarioAux[0]);
    setMateria(materiaAux[0]);
    setLoading(true)


    // const horarioAux = BackendConnection.getHo
  };

  return (
    <div>
      <CardItem
        text={`Dia:${grupoHorario.dia}`}
        tercerText={horario? `Horario Inicial: ${horario.horaini} Final: ${horario.horafin}`: ''}
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
