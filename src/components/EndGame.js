import React from 'react'
import { lang } from './Languages';
import { serviceendpoint, gameURL,  playerID } from './Imports';

export default function EndGame(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

    function end(){

        if (Number(sessionStorage.getItem('ownerID')) === Number(localStorage.getItem('playerID'))) {

          fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
            method: "PATCH",
            body: JSON.stringify({ player: Number(localStorage.getItem('playerID')), action: "end" }),
            headers: { "Content-Type": "application/json" }
          })
            .then(res => res.json())
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          console.log('Not the owner. Cannot end the game.');
        }
}


  return (
    <div id='endGame'>
      <button id='btnStart' className='disabled' onClick={end}>END</button>
    </div>
  )
}
