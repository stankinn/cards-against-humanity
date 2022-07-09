import React from 'react';
import {serviceendpoint} from '../Imports';
import {useState, useEffect} from 'react';

export default function PlayerList(){
    
    const id = sessionStorage.getItem('gameID');

    let [pList, setPList] = useState([]);
    let [gameID] = useState(id);
    let playerLength = 0;

    function showPlayer(){

        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data=>{
            if(data.games.length !== 0){
                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === Number(sessionStorage.getItem('gameID'))){
                        setPList(data.games[i].players);
                        playerLength = data.games[i].players.length;
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    } 

    useEffect(() => {
        showPlayer();
        if(Number(sessionStorage.getItem('ownerID')) === Number(localStorage.getItem('playerID'))){
            // if Player.length >= 3
            document.getElementById('startBtn').classList.remove('hidden')
            // else document.getElementById('startBtn').classList.add('hidden')
            if(playerLength >= 3){
                console.log('JETZT Button')
            }
        }
    })
        

    function startGame(){
        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data=>{

                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
                    method: "PATCH",
                    body: JSON.stringify({ action: "start" }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => {
                    if(res.ok){
                        document.getElementById('gameLobby').classList.add('hidden');
                    }
                    return res
                })
                .then(res => res.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
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