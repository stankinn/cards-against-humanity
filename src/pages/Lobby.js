import React from 'react'
import '../components-styles/FirstPages.css'
import '../components-styles/GameLobby.css'
import '../components-styles/Lobby.css'
import {lang} from '../Languages';
import GameList from './MainLobbyComp/GameList';
import Home from './MainLobbyComp/Home';
import {useNavigate} from 'react-router-dom';

export default function Lobby(props) {

  let navigate = useNavigate();

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
   
    <div className='allLobbyLayout'>
      <Home/>
      <GameList language={props.language}/>
      <button id='createBtn' className='continueBtn' title='Create Game' onClick={() => navigate('./create-game')}>{content.createGame}</button>
    </div>
  )
}
