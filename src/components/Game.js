import React from 'react'
import BlackCard from './BlackCard';
import WhiteCards from './WhiteCards';
import PlayerPoints from './PlayerPoints';
import EndGame from './EndGame';
import {lang} from './Languages';
import '../components-styles/Game.css'
import DeleteGame from './GameLobbyComp/DeleteGame';

export default function Game(props) {


    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);
  return (
    <div className='gameLayout'>

      <div id='blackCard' className='gameDiv'>
        <BlackCard/>
      </div>

      <div id='gameInfo' className='gameDiv'>
        <PlayerPoints/>
      </div>

      <div id='offeredCards' className='gameDiv cardsBackground'>
        <WhiteCards/>
      </div>

      <div id='playerCards' className='gameDiv cardsBackground'>
        <WhiteCards/>
      </div>
      <div id='deleteButton'>
        <DeleteGame/>
      </div>
      <div id='deleteButton'>
        <EndGame/>
      </div>
      
    </div>

  )
}
