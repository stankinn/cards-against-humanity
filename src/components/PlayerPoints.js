import React from 'react';
import { serviceendpoint} from './Imports';
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
                        for(var j=0; j < data.games[i].players.length; j++){
                            arrName = arrName.concat(data.games[i].players[j].name)
                        }
                        setplayerList(arrName)
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        if(Number(sessionStorage.getItem('gameID'))){
            try {
            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
            .then(res => res.json())
            .then(data => {
                if(data.points){
                    if(playerList.length === data.points.length){
                        console.log('Its the same Length!')
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
            } catch (error) {
                console.log('error')
            }
        }
    }

        return (
            <>
                {finalList.map(({ name, points }) => (
                    <p key={name}>{name}.....{points}</p>
                ))}
            </>
        );
    }
