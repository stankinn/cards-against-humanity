import React from 'react'
import Player from './PlayerCreationComp/Player'
import Play from './PlayerCreationComp/Play'
// import DeleteGame from './GameLobbyComp/DeleteGame'
import '../components-styles/FirstPages.css'
import {lang} from './Languages';
import EndGame from './EndGame';

export default function PlayerCreation(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className='playerLayout'>
      <h1 id='headerP'>{content.headerP}</h1>
      <p id='curName'>{content.curName}</p>
      <input id='inputName' maxLength={14}/>
      <Player delBtn={content.delBtn} addBtn={content.addBtn}/>
      <Play playBtn={content.playButton}/>
      <EndGame/> 
    </div>
  )
}
