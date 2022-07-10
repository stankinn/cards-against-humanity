import React from 'react'
import { serviceendpoint} from './Imports';
import {useState, useEffect} from 'react';

export default function CurCzar() {

    let [czar, setCzar] = useState([]);

      useEffect(() =>{
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            for(var i = 0; i < data.games.length; i++){
                if(data.games[i].id === Number(sessionStorage.getItem('gameID'))){
                    if(data.games[i].running){
                        setCzar(data.games[i].czar.name)
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      })

  return (
    <p>Czar: {czar}</p>
  )
}
