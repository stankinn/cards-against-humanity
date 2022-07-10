import React from 'react';
import { serviceendpoint } from '../Imports';

export default function DeleteGame() {

    function deleteGame (){

        fetch(serviceendpoint + '/games/')
        .then(res =>res.json()).then(data => {
            console.log(JSON.stringify(data))
            if (data.games.length !== 0) {
                console.log('DEBUG GAME ID: ' + sessionStorage.getItem('gameID'));
                //spiel beenden:
                /* fetch(serviceendpoint + '/games/' + data.games[data.games.length-1].id + '/' + data.games[data.games.length-1].owner.id, {
                     method: "PATCH",
                     body: ({action: 'end'}),
                     headers: { "Content-Type": "application/json" }
                 })
                 .then(response => response.json())
                 .catch((error) => {
                     console.error('Error:', error);
                 });*/

                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')), {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => {
                    if(res.ok){
                        sessionStorage.clear();
                        document.getElementById('playerCreation').classList.remove('hidden')
                    }
                    return res
                })
                .then(res => res.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
                    
            } else {
                console.log('No Games existing.');
            }
        })

    }
    return (
        <button id="delGameBtn" className='delBtn' onClick={deleteGame}>Delete Game</button>
    );

}