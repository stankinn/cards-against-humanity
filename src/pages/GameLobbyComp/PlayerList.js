import React, { useState, useEffect } from 'react';
import { serviceendpoint } from '../Imports';
import {useNavigate} from 'react-router-dom';
import { lang } from '../../Languages';

export default function PlayerList(props) {

    const id = localStorage.getItem('gameID');
    let navigate = useNavigate();

    let [pList, setPList] = useState([]);
    let [gameID] = useState(id);
    let playerLength = 0;

    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

      // look if the game is running and navigate to game if it is
    useEffect(() => {
        const interval = setInterval(() => {
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            if (data.games.length !== 0) {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(localStorage.getItem('gameID'))) {
                        if(data.games[i].running === true)
                        navigate('/game');
                    }
                }
            }
        });
        showPlayer();
        }, 500);
        return () => clearInterval(interval);
      });


    function showPlayer() {
        
        // add players that are in the game to the list and show the play-button (only for the owner) if there are 3 or more players
        fetch(serviceendpoint + '/games/')
            .then(res => res.json())
            .then(data => {
                if (data.games.length !== 0) {
                    for (var i = 0; i < data.games.length; i++) {
                        if (data.games[i].id === Number(localStorage.getItem('gameID'))) {

                            //update ownerID, if previous owner left the game
                            localStorage.setItem('ownerID', data.games[i].owner.id);
                            if(!data.games[i].running){
                                setPList(data.games[i].players);
                                playerLength = data.games[i].players.length;
                                if (Number(localStorage.getItem('ownerID')) === Number(localStorage.getItem('playerID'))) {
                                    if (playerLength >= 3) {
                                        document.getElementById('startBtn').classList.remove('hidden');
                                    } else {
                                        document.getElementById('startBtn').classList.add('hidden');
                                    }
                                }
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function startGame() {

        // start the game if the player is the owner
        fetch(serviceendpoint + '/games/')
        .then(res => res.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++) {
                if (data.games[i].id === Number(localStorage.getItem('gameID'))) {
                    if (data.games[i].owner.id === Number(localStorage.getItem('ownerID'))) {
                    
                        fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
                            method: "PATCH",
                            body: JSON.stringify({ action: "start" }),
                            headers: { "Content-Type": "application/json" }
                        })
                        .then(res => {
                            if (res.ok) {
                                navigate('/game');
                            }
                            return res
                        })
                        .then(res => res.json())
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    }
                }
            }
        })

    }

    return (
        <>
            <h1>{content.headerG} {gameID}</h1>
            <div className='list'>
                {pList.map(({ name, id }) => (
                    <p key={id}>{name} ({id})</p>
                ))}
            </div>
            <button id='startBtn' className='continueBtn hidden' onClick={startGame}>{content.startButton}</button>
        </>
    );
}