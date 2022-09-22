import React, { useEffect } from 'react'
import BlackCard from './GameComp/BlackCard';
import WhiteCards from './GameComp/WhiteCards';
import CurCzar from './GameComp/CurCzar';
import PlayerPoints from './GameComp/PlayerPoints';
import IngamePacks from './GameComp/IngamePacks';
import EndGame from './GameComp/EndGame';
import Result from './GameComp/Result';
import { lang } from '../Languages';
import '../components-styles/Game.css'
import { Link, useNavigate} from 'react-router-dom';
import { serviceendpoint } from './Imports';


export default function Game(props) {

let navigate = useNavigate();

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);


  let gameID = Number(localStorage.getItem("gameID"));
  let playerID = Number(localStorage.getItem("playerID"));


 //tab close event listener
  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');


      leave();
      return (event.returnValue = 'Are you sure you want to exit?');  
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);


  //navigate to lobby if game is not running anymore
    fetch(serviceendpoint + '/games/')
    .then(response => response.json())
    .then(data => {
      for (var i = 0; i < data.games.length; i++) {
        console.log(data.games[i].id);
        if (data.games[i].id === gameID) {

          console.log(data.games[i].running);
          if (data.games[i].running === false) {
            navigate('/lobby/' + gameID);
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  function leave() {

    // leaving game and returning to start-page
    fetch(serviceendpoint + '/games/' + gameID + '/' + playerID, {
      method: 'PATCH',
      body: JSON.stringify({ player: playerID, action: "leave" }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('gameID');
          localStorage.removeItem('ownerID');
          navigate('/lobby/' + gameID);
        }
        return res
      })
      .then(res => res.json())
      .catch((error) => {
        console.error('Error:', error);
      });

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
