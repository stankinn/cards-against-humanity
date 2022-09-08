import React from 'react'
import '../components-styles/FirstPages.css'
import '../components-styles/GameLobby.css'
import {lang} from '../Languages';
import GameList from './LobbyComp/GameList';
import {Link} from 'react-router-dom';

export default function Lobby(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <>
    
    <Link to= './create-game'><button className='continueBtn' >Create Game</button></Link>

    <div className=''>
      <GameList language={props.language}/>
    </div>
    
    </>
  )
}
