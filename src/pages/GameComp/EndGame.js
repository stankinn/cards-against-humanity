import React from 'react'
import { useNavigate } from 'react-router-dom';
import { serviceendpoint } from '../Imports';

export default function EndGame(props) {

  let navigate = useNavigate();

  function end() {

    if (Number(localStorage.getItem('ownerID')) === Number(localStorage.getItem('playerID'))) {
      fetch(serviceendpoint + '/games/' + Number(localStorage.getItem('gameID')) + '/' + Number(localStorage.getItem('playerID')), {
        method: "PATCH",
        body: JSON.stringify({ player: Number(localStorage.getItem('playerID')), action: "end" }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (res.ok) {
            deleteGame();
          }
          return res;
        })
        .then(res => res.json())
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      localStorage.removeItem('ownerID');
      localStorage.removeItem('gameID');
      navigate('/cards-against-humanity');
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
          navigate('/cards-against-humanity');
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
