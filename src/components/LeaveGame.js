import React from 'react';
import { serviceendpoint, gameURL, playerURL } from './Imports';
import { lang } from './Languages';

export default function LeaveGame(props) {

    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

    var playerID= '';
    var gameID= '';
    
    playerURL.then(data=>{  
        if(data.players.length !== 0){
        playerID = data.players[data.players.length-1].id;

        gameURL.then(data =>{
            console.log("all games: " + data.games.length);

            for(var i = 0; i < data.games.length; i++){
                if (data.games[i].running === false){
                    gameID = data.games[i].id;
                }
            }
            //console.log("GAME ID: " + gameID);
            fetch(serviceendpoint + '/games/'+ gameID + '/'+ playerID, {
                method: "PATCH",
                body: JSON.stringify({ player: playerID, action: "leave"}),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        })

    }
})

return (
    <div id='leaveGame'>
      <button id='btnLeave' onClick={LeaveGame}>{content.leaveButton}</button>
    </div>
  )
}