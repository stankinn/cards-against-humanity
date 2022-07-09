import React from 'react';
import { serviceendpoint, gameURL, playerURL, playerID } from './Imports';
import { lang } from './Languages';

export default function LeaveGame(props) {

    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);


function leave(){
    var gameID= '';
    
        gameURL.then(data =>{
            for(var i = 0; i < data.games.length; i++){
                console.log("here");
                if (data.games[i].running === false){
                    gameID = data.games[i].id;
                    console.log(gameID);
                }
            }
            console.log("PLAYER ID: " + playerID);
            fetch(serviceendpoint + '/games/'+ gameID + '/'+ playerID, {
                method: "PATCH",
                body: JSON.stringify({ player: playerID, action: "leave"}),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(()=> document.getElementById('playerCreation').classList.remove('hidden'))
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