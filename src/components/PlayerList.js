import React from 'react';
import {serviceendpoint, playerID} from './Imports';
import {useState, useEffect} from 'react';

export default function PlayerList(){
    
    let [pList, setPList] = useState([]);
    let gameID= '';
    let ownerId = '';
    let playerLength = 0;

    function showPlayer(){

        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data=>{
            if(data.games.length !== 0){
                for(var i = 0; i < data.games.length; i++){

                    if (data.games[i].running === false){
                        gameID = data.games[i].id;
                        setPList(data.games[i].players);
                        playerLength = data.games[i].players.length;
                        for (var j = 0; j < playerLength; j++) {
                          if (data.games[i].players[j].id === data.games[i].owner.id) {
                            ownerId = data.games[i].owner.id;
                          }
                        }
                    }
                }
            }
            if(playerLength >= 3){
                document.getElementById('startBtn').classList.remove('hidden');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    } 

    useEffect(() => {showPlayer();})
        

    function startGame(){
        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data=>{

            for(var i = 0; i < data.games.length; i++){

                if (data.games[i].running === false){
                    gameID = data.games[i].id;
                    playerLength = data.games[i].players.length;
                    for (var j = 0; j < playerLength; j++) {
                      if (data.games[i].players[j].id === data.games[i].owner.id) {
                        ownerId = data.games[i].owner.id;
                      }
                    }
                }
            }

        console.log(ownerId);
            if (ownerId === Number(playerID)) {
                document.getElementById('gameLobby').classList.add('hidden');

                fetch(serviceendpoint + '/games/' + gameID + '/' + Number(playerID), {
                    method: "PATCH",
                    body: JSON.stringify({ player: playerID, action: "start" }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                console.log('Not the owner. Cannot start the game.');
            }
        })
    }


        return (
            <>
                <h1>GAME {gameID}</h1>
                <div className='list'>
                    {pList.map(({ name, id }) => (
                    <p key={id}>{name} ({id})</p>
                    ))}
                </div>
                <button id='startBtn' className='continueBtn' onClick={startGame}>START</button>
            </>
        );
}