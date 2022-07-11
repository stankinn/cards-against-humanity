import React from 'react';
import { serviceendpoint} from '../Imports';
import {useState, useEffect} from 'react';

export default function PlayerPoints(){

    let [finalList, setFinalList] = useState([]);
    let [playerList, setplayerList] = useState([]);

    var arr = [];
    var arrName = [];

      useEffect(() =>{
        showPlayer();
      })


    function showPlayer() {
 
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            if (data.games.length !== 0) {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if(data.games[i].running){
                            for(var j=0; j < data.games[i].players.length; j++){
                                arrName = arrName.concat(data.games[i].players[j].name)
                            }
                            setplayerList(arrName)

                            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
                            .then(res => res.json())
                            .then(data => {
                                if(data.points){
                                    if(playerList.length === data.points.length){
                                        for(var i = 0; i < playerList.length; i++){
                                            arr = arr.concat({'name': playerList[i],'points': data.points[i]})
                                        }
                                        setFinalList(arr)
                                    }
                                }
                            })
                            .catch((error) => {
                              console.error('Error:', error);
                            });
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    

        return (
            <div className='playerPoints'>
                {finalList.map(({ name, points }) => (
                    <p key={name}>{name}.....{points}</p>
                ))}
            </div>
        );
    }
