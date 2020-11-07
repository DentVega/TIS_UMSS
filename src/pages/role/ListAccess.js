import React from 'react';
import {Checkbox,FormControl,FormGroup,FormControlLabel,FormLabel } from '@material-ui/core';

export const ListAccess=(props)=>{
   const Plantel=props.state[0].checked;
   const Facultades=props.state[1].checked;
   const Materias=props.state[2].checked;
   const Reportes=props.state[3].checked;
   const Horarios=props.state[4].checked;
   const Grupos=props.state[5].checked;
   const Administracion=props.state[6].checked;
    
    const handleChange = ({target}) => {
      let arr=[...props.state];      
      let newObj={...arr[target.id-1],checked:target.checked};
      arr[target.id-1]=newObj;
      props.setState(arr);      
    };
    return(
    <FormControl>
        <FormLabel>Lista de Accesos</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox id={1} onChange={handleChange} checked={Plantel} name="Plantel" />}
            label="Plantel"
          />
          <FormControlLabel
            control={<Checkbox id={2} onChange={handleChange} checked={Facultades} name="Facultades"/>}
            label="Facultades"
          />
          <FormControlLabel
            control={<Checkbox id={3} onChange={handleChange} checked={Materias} name="Materias" />}
            label="Materias"
          />
          <FormControlLabel
            control={<Checkbox id={4} onChange={handleChange} checked={Reportes} name="Reportes" />}
            label="Reportes"
          />
          <FormControlLabel
            control={<Checkbox id={5} onChange={handleChange} checked={Horarios} name="Horarios" />}
            label="Horarios"
          />
          <FormControlLabel
            control={<Checkbox id={6} onChange={handleChange} checked={Grupos} name="Grupos" />}
            label="Grupos"
          />
          <FormControlLabel
            control={<Checkbox  id={7} onChange={handleChange} checked={Administracion} name="Administracion" />}
            label="Administracion"
          />
        </FormGroup>
        
      </FormControl>
    )
}
