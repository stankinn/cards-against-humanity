import React from 'react';
import { serviceendpoint, playerID } from './Imports';

export default function DeleteGame() {

    function deleteGame (){

        var gameID = '';

        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data => {
            if (data.games.length !== 0) {
                for (var i = 0; i < data.games.length; i++){
                    for (var j = 0; j < data.games[i].players.length; j++){
                        if(data.games[i].players[j].id == Number(playerID)){
                            gameID= data.games[i].id;
                        }
                    }
                }
                console.log('DEBUG GAME ID: ' + gameID);
                fetch(serviceendpoint + '/games/' + gameID, {
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
        })
        document.getElementById('playerCreation').classList.remove('hidden')

    }
    return (
        <button id="delGameBtn" className='delBtn' onClick={deleteGame}>Delete Game</button>
    );

}