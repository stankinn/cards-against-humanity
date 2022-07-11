import React from 'react'
import '../components-styles/FirstPages.css'
import '../components-styles/GameLobby.css'
import PlayerList from './GameLobbyComp/PlayerList';
import {lang} from '../Languages';
import LeaveGame from './GameLobbyComp/LeaveGame';
import DeleteGame from './GameLobbyComp/DeleteGame';

export default function GameLobby(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className='lobbyLayout'>
      <PlayerList language={props.language}/>
      <LeaveGame language={props.language}/>
      {/* {<DeleteGame language={props.language}/>} */}
    </div>
  )
}
