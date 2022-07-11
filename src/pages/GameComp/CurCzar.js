import React from 'react'
import { serviceendpoint} from '../Imports';
import {useState, useEffect} from 'react';
import { lang } from '../../Languages';

export default function CurCzar(props) {

    let [curCzar, setCzar] = useState([]);

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

      useEffect(() =>{
        const interval = setInterval(() => {
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            for(var i = 0; i < data.games.length; i++){
              if(data.games[i].id === Number(sessionStorage.getItem('gameID'))){
                if(data.games[i].running){
                  console.log(JSON.stringify(data.games[i].czar))
                  console.log(data.games[i].czar.name)
                  setCzar(data.games[i].czar.name)
                }
              }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        }, 1000);
        return () => clearInterval(interval);
      }, []);

  return (
    <p>{content.czar} {curCzar}</p>
  )
}
