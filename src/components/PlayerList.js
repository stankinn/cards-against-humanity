import React from 'react';
import {serviceendpoint, gameURL, playerURL} from './Imports';
import {useState, useEffect} from 'react';

export default function PlayerList(){
    
    let [pList, setPList] = useState([]);
    let gameID= '';
    let ownerId = '';
    let playerID = '';
    let playerLength = 0;

    function showPlayer(){

        gameURL.then(data=>{
            if(data.games.length !== 0){
                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){
                        gameID = data.games[i].id;
                        setPList(pList[i] = data.games[i].players);
                        //this.setState({notice: this.state.notice.concat(data.games[i].players)});
                        playerLength = data.games[i].players.length;
                        for (var j = 0; j < data.games[i].players.length; j++) {
                          if (data.games[i].players[j].id === data.games[i].owner.id) {
                            ownerId = data.games[i].owner.id;
                          }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        playerURL.then(data => {

            if (data.players.length > 0){
            playerID = data.players[data.players.length - 1].id;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        if (ownerId === playerID) {
            if(playerLength >= 3){
                document.getElementById('startBtn').classList.remove('hidden');
            }
        }
    } 

    useEffect(() => {showPlayer();})
        

    function startGame(){
            if (ownerId === playerID) {
                document.getElementById('gameLobby').classList.add('hidden');

                fetch(serviceendpoint + '/games/' + gameID + '/' + playerID, {
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
    }


        return (
            <>
                <h1>GAME {gameID}</h1>
                <div className='list'>
                    {pList.map(({ name, id }) => (
                        <p key={id}>{name}</p>
                    ))}
                </div>
                <button id='startBtn' className='continueBtn hidden' onClick={startGame}>START</button>
            </>
        );
}