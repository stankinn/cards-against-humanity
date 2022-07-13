import React from 'react'
import Player from './PlayerCreationComp/Player'
import Play from './PlayerCreationComp/Play'
import '../components-styles/FirstPages.css'
import {lang} from '../Languages';
// import DeleteAll from './DeleteAll';

export default function PlayerCreation(props) {

  localStorage.removeItem('gameID');
  localStorage.removeItem('ownerID');
  
  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className='playerLayout'>
      <h1 id='headerP'>{content.headerP}</h1>
      <p id='curName'>{content.curName}</p>
      <input id='inputName' maxLength={14}/>
      <Player language={props.language}/>
      <Play language={props.language}/> 
      {/* <DeleteAll/> */}
    </div>
  )
}
