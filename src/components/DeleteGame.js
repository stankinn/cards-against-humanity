import React from 'react';
import { serviceendpoint, playerID } from './Imports';

export default function DeleteGame() {

  const gameID= sessionStorage.getItem('gameID');

    function deleteGame (){

        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data => {
            if (data.games.length !== 0) {
                
                console.log('DEBUG GAME ID: ' + gameID);
                fetch(serviceendpoint + '/games/' + Number(gameID), {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => response.json())
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } else {
                console.log('No Games existing.');
            }   
        sessionStorage.removeItem('gameID');
        document.getElementById('playerCreation').classList.remove('hidden'); 
    })
    }

    return (
        <button id="delGameBtn" className='delBtn' onClick={deleteGame}>Delete Game</button>
    );

}