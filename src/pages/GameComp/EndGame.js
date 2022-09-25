import React from 'react'
import { useNavigate } from 'react-router-dom';
import { serviceendpoint } from '../Imports';

export default function EndGame(props) {

  let navigate = useNavigate();
  let playerID = Number(localStorage.getItem('playerID'));
  let gameID = Number(localStorage.getItem('gameID'));
  let ownerID = Number(localStorage.getItem('ownerID'));

  function end() {
    //if owner, then end and delete game
    if (ownerID === playerID) {
      fetch(serviceendpoint + '/games/' + gameID + '/' + playerID, {
        method: "PATCH",
        body: JSON.stringify({ player: playerID, action: "end" }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (res.ok) {
            navigate('/lobby/' + gameID);
          }
          return res;
        })
        .then(res => res.json())
        .catch((error) => {
          console.error('Error:', error);
        });
   //if not the owner, just leave game 
  } else {
      leave();
    }
  }

  function deleteGame() {

    fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('ownerID');
          localStorage.removeItem('gameID');
          navigate('/lobby');
        }
        return res
      })
      .then(res => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function leave() {

    // leaving game and returning to lobby
    fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
      method: 'PATCH',
      body: JSON.stringify({ player: localStorage.getItem('playerID'), action: "leave" }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('gameID');
          localStorage.removeItem('ownerID');
          navigate('/lobby');
        }
        return res
      })
      .then(res => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div id='endGame' title='end Game' onClick={() => end()}>
      <button id='btnStart'>
        <div id='endBar1' />
        <div id='endBar2' />
      </button>
    </div>
  )
}
