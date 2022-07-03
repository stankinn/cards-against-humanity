import React from 'react'
import Player from './Player'
import Games from './games'
import '../components-styles/Start.css'
import {lang} from './Languages';

export default function Start(props) {

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);
  return (
    <div id='startLayout'>
        <h1 id='headerP'>{content.headerP}</h1>
        {/* <h>{content.deleteButton}</h>
        <h >{content.newButton}</h> */}
        <Player/>
        <h1 id='headerG'>{content.headerG}</h1>
        <Games/>
        <button id='btnStart' className='disabled'>{content.playButton}</button>
    </div>
  )
}
