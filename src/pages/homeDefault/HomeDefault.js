import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import BackendConnection from '../../api/BackendConnection';
import CardItem from '../../components/CardItem';

function HomeDefault() {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    BackendConnection.getCarreras().then((carreras) => {
      setCarreras(carreras);
    });
  }, []);

  console.log('carreras', carreras);

  return (
    <div>
      <h1>Bienvenido</h1>
      <h3>Nuestras Carreras</h3>
      <Grid container={true}>
        {carreras.map((career) => {
          return (
            <div key={career.idcarrera}>
              <CardItem
                width={'100vh'}
                text={`Nombre: ${career.namecarrera}`}
                secondaryText={`Descripcion: ${career.descripcion}`}
              />
              <div style={{ height: 20 }}/>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}

export default HomeDefault;
