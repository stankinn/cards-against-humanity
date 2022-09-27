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

  let [running, setRunning] = useState();

  let gameID = Number(localStorage.getItem("gameID"));
  let playerID = Number(localStorage.getItem("playerID"));
  let ownerID = Number(localStorage.getItem("ownerID"));


  //tab close event listener, leave game when tab is closed
  useEffect(() => {
    
    const handleTabClose = event => {
      event.preventDefault();

      //muss noch nach antwort gecheckt werden, erst dann leave
      updateOwner();
      leave();
      
      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  function leave() {

    fetch(serviceendpoint + '/games/' + gameID + '/' + playerID, {
      method: 'PATCH',
      body: JSON.stringify({ player: playerID, action: "leave" }),
      headers: { "Content-Type": "application/json" }
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

  function updateOwner(){

    if(playerID === ownerID){

      fetch(serviceendpoint + '/games/')
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
      <div className='bc'>
        <BlackCard language={props.language} />
      </div>

      <CurCzar language={props.language} />
      <PlayerPoints language={props.language} />
      
      <div className='buttonPacks'>
        <Link to="/gamePackInfo" target="_blank" rel="noopener noreferrer">
          <button> Pack Details </button>
        </Link>
      </div>
      
      <IngamePacks language={props.languages} />

      <WhiteCards language={props.language} />
      <Result language={props.language} />
      <EndGame />
    </div>
  )
}
