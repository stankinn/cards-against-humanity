import React from 'react'
import Player from './Player'
import Play from './Play'
import '../components-styles/FirstPages.css'
import {lang} from './Languages';


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
    </div>
  )
}
