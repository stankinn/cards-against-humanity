import React from 'react'
import '../components-styles/FirstPages.css'
import '../components-styles/GameLobby.css'
import '../components-styles/Lobby.css'
import {lang} from '../Languages';
import GameList from './LobbyComp/GameList';
import {Link} from 'react-router-dom';

export default function Lobby(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className='allLobbyLayout'>
      <GameList language={props.language}/>
      <Link to= './create-game'>
        <button id='createBtn' className='continueBtn' >{content.createGame}</button>
      </Link>
    </div>
  )
}
