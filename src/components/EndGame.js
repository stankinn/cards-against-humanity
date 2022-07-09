import React from 'react'
import { lang } from './Languages';
import { serviceendpoint, gameURL, playerURL, playerID } from './Imports';

export default function EndGame(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

    function end(){
    let gameId = '';
    let ownerId = '';

      gameURL.then(data => {
        for (var i = 0; i < data.games.length; i++) {
          for (var j = 0; j < data.games[i].players.length; j++) {
            if (data.games[i].players[j].id === Number(playerID)) {
              gameId = data.games[i].id;
              ownerId = data.games[i].owner.id;
              i = data.games.length;
              break;
            }
          }
        }

        if (ownerId === Number(playerID)) {

          fetch(serviceendpoint + '/games/' + gameId + '/' + Number(playerID), {
            method: "PATCH",
            body: JSON.stringify({ player: Number(playerID), action: "end" }),
            headers: { "Content-Type": "application/json" }
          })
            .then(res => res.json())

            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          console.log('Not the owner. Cannot end the game.');
        }
      })
        .catch((error) => {
          console.error('Error:', error);
        });
}


  return (
    <div id='endGame'>
      <button id='btnStart' className='disabled' onClick={end}>{content.endButton}</button>
    </div>
  )
}
