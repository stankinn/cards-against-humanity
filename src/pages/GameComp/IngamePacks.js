import React, {useState, useEffect}  from 'react';
import { serviceendpoint} from '../Imports';
import {lang} from '../../Languages';

export default function PlayerPoints(props){

    let [packList, setPacks] = useState([]);
    var arr = [];

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    // display all used Packs at the beginning
    useEffect(() =>{
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++){
                
                // get all used packs from curGame
                if (data.games[i].id === Number(localStorage.getItem('gameID'))) {
                    let curGamePacks = data.games[i].packs

                    // put used packs name and id in setPacks State
                    fetch(serviceendpoint + '/packs/')
                    .then(response => response.json())
                    .then(packData => {
                        for(var i = 0; i < packData.packs.length; i++){
                            for(var j = 0; j < curGamePacks.length; j++){
                                if(packData.packs[i].id === curGamePacks[j]){
                                    arr[j]={'name': packData.packs[i].name, 'id': packData.packs[i].id};
                                }
                            }
                        }
                    setPacks(arr)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div id='ingamePacks' className='ingameList'>
            {packList.map((pack) =>(
                <p key={pack.id}>{pack.name}</p>
            ))}
        </div>
    );
}
