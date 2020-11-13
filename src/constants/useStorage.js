import {useState,useEffect} from 'react';
import {projectStorage} from '../api/Firebase/config';

const useStorage=(file)=>{
    const [url,setUrl] = useState(null);
    const[error,setError] = useState(null);
    useEffect(()=>{
        if(file.length!==0){
        const storageRef= projectStorage.ref(file.name);
        storageRef.put(file).on('state_changed',(snap)=>{
        },(err)=>{
            setError(err);
        },async ()=>{
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        })
    }
    },[file])
    return[url,error];
}

export default useStorage;