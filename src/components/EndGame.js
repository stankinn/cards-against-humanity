import React from 'react'
import { lang } from './Languages';
import { serviceendpoint, gameURL,  playerID } from './Imports';

export default function EndGame(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  function end(){

fetch(serviceendpoint + '/games/')
.then(res => res.json())
.then(data => {
  
  for (var i = 0; i < data.games.length; i++){



//Number(sessionStorage.getItem('ownerID'))
    if(data.games[i].owner.id  === Number(localStorage.getItem('playerID'))) {
      var gameid= data.games[i].id;
//Number(sessionStorage.getItem('gameID'))    
      fetch(serviceendpoint + '/games/' + gameid + '/' + Number(localStorage.getItem('playerID')), {
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

   
    
    
//deleteGame();

}
  })
  }
   
  function deleteGame (){
    
    fetch(serviceendpoint + '/games/')
    .then(res =>res.json()).then(data => {
      console.log(JSON.stringify(data))
      if (data.games.length !== 0) {
        for (var i = 0; i < data.games.length; i++){
        console.log('DEBUG GAME ID: ' + sessionStorage.getItem('gameID'));
        if(data.games[i].owner.id  === Number(localStorage.getItem('playerID'))) {
          var gameid= data.games[i].id;
        }
    //Number(sessionStorage.getItem('gameID'))
        fetch(serviceendpoint + '/games/' + gameid, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        })
        /*.then(res => {
          if(res.ok){
            sessionStorage.clear();
            document.getElementById('playerCreation').classList.remove('hidden');
            document.getElementById('gameLobby').classList.remove('hidden');
          }
          return res
        })*/
        .then(res => res.json())
        .catch((error) => {
          console.error('Error:', error);
        });}
                        
      } else {
        console.log('No Games existing.');
      }
    })
  }

  return (
    // <div id='endGame'>
    //   <button id='btnStart' className='disabled' onClick={end}>ENDE</button>
    // </div>
      <div id='endGame' title='end Game' onClick={end}>
        <button id='btnStart'>
          <div id='endBar1'/>
          <div id='endBar2'/>
        </button>
      </div>
  )
}
