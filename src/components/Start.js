import React, {useState} from 'react'
import Player from './Player'
import Games from './games'
import '../components-styles/Start.css'
import { lang } from './Languages';
import { serviceendpoint, gameURL, playerURL } from './index';


export default function Start(props) {
  
  let content = lang;
  
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  console.log('START');

    let gameId = '';
    let playerId = '';
    let ownerId = '';

    playerURL.then(data => {
      playerId = data.players[data.players.length - 1].id;
      gameURL.then(data => {

        if (data.games.length === 0) {
          console.log('There are no games yet.');
        }
        for (var i = 0; i < data.games.length; i++) {
          for (var j = 0; j < data.games[i].players.length; j++) {
            if (data.games[i].players[j].id === playerId) {
              gameId = data.games[i].id;
              ownerId = data.games[i].owner.id;
              i = data.games.length;
              break;
            }
          }
        }

        if (ownerId === playerId) {

          fetch(serviceendpoint + '/games/' + gameId + '/' + playerId, {
            method: "PATCH",
            body: JSON.stringify({ player: playerId, action: "start" }),
            headers: { "Content-Type": "application/json" }
          })
            .then(res => res.json())

            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          console.log('Not the owner. Cannot start the game.');
        }
      })
        .catch((error) => {
          console.error('Error:', error);
        });
    })

  


  return (
    <div id='startLayout'>
      <h1 id='headerP'>{content.headerP}</h1>
      {/*<h>{content.deleteButton}</h>
        <h>{content.newButton}</h>*/}
      <Player />
      <h1 id='headerG'>{content.headerG}</h1>
      <Games />
      <button id='btnStart' className='disabled' onClick={Start}>{content.playButton}</button>
    </div>
  )
}
