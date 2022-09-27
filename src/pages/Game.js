import React, { useEffect, useState } from 'react'
import BlackCard from './GameComp/BlackCard';
import WhiteCards from './GameComp/WhiteCards';
import CurCzar from './GameComp/CurCzar';
import PlayerPoints from './GameComp/PlayerPoints';
import IngamePacks from './GameComp/IngamePacks';
import EndGame from './GameComp/EndGame';
import Result from './GameComp/Result';
import { lang } from '../Languages';
import '../components-styles/Game.css'
import { Link, useNavigate } from 'react-router-dom';
import { serviceendpoint } from './Imports';


export default function Game(props) {

  let navigate = useNavigate();

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  let gameID = Number(localStorage.getItem("gameID"));
  let playerID = Number(localStorage.getItem("playerID"));
  let ownerID = Number(localStorage.getItem("ownerID"));

  //tab close event listener, leave game when tab is closed
  useEffect(() => {


    window.onbeforeunload = function () {

      updateOwner();
      leave();

      return;
    }

  }, []);

  function leave() {

    fetch(serviceendpoint + '/games/' + gameID + '/' + playerID, {
      method: 'PATCH',
      keepalive: true,
      body: JSON.stringify({ player: playerID, action: "leave" }),
      headers: { "Content-Type": "application/json" },
      
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('gameID');
          localStorage.removeItem('ownerID');
        }
        return res
      })
      .then(res => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function updateOwner() {

    if (playerID === ownerID) {

      fetch(serviceendpoint + '/games/',{ keepalive: true})
        .then(res => res.json())
        .then(data => {
          if (data.games.length !== 0) {
            for (var i = 0; i < data.games.length; i++) {
              if (data.games[i].id === gameID) {
                //update ownerID in local storage
                localStorage.setItem('ownerID', data.games[i].owner.id);
              }
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  return (
    <div className='gameLayout'>

      <div id='blackCard' className='gameDiv'>
        <BlackCard language={props.language} />
      </div>

      <div id='gameInfo' className='gameDiv'>
        <CurCzar language={props.language} />

        <PlayerPoints language={props.language} />
        <Link to="/gamePackInfo" target="_blank" rel="noopener noreferrer"><button className='buttonPacks' > Pack Details </button></Link>
      </div>
      <IngamePacks language={props.languages} />

      <WhiteCards language={props.language} />
      <Result language={props.language} />
      <EndGame />
    </div>
  )
}
