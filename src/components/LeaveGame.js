import React from 'react';
import { serviceendpoint, playerID } from './Imports';
import { lang } from './Languages';

export default function LeaveGame(props) {

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);


    function setGameID(id) {
        sessionStorage.setItem('gameID', id);
        console.log('Your Game: ' + sessionStorage.getItem('gameID'));
    }

    function leave() {
        var gameID = '';

        fetch(serviceendpoint + '/games/')
            .then(res => res.json()).then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].running === false) {
                        setGameID(data.games[i].id);
                    }
                }
                console.log("PLAYER ID: " + playerID);
                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/' + Number(playerID), {
                    method: 'PATCH',
                    body: JSON.stringify({ player: playerID, action: "leave" }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => response.json())
                    .then(() => {
                        sessionStorage.removeItem('gameID');
                        document.getElementById('playerCreation').classList.remove('hidden')
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
    }

    return (
        <div id='leaveGame'>
            <button id='btnLeave' onClick={leave}>{content.leaveButton}</button>
        </div>
    )
}