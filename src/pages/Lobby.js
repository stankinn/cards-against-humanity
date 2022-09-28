import React from 'react'
import '../components-styles/FirstPages.css'
import '../components-styles/GameLobby.css'
import '../components-styles/Lobby.css'
import {lang} from '../Languages';
import GameList from './LobbyComp/GameList';
import Home from './LobbyComp/Home';
import {Link} from 'react-router-dom';

export default function Lobby(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
   
    <div className='allLobbyLayout'>
      <Home/>
      <GameList language={props.language}/>
    </div>
  )
}
