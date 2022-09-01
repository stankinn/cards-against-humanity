import React from 'react'
import '../components-styles/FirstPages.css'
import '../components-styles/GameLobby.css'
import {lang} from '../Languages';
import GameList from './LobbyComp/GameList';

export default function Lobby(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className=''>
      <GameList language={props.language}/>
    </div>
  )
}
