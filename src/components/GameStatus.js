import React from 'react'
import BlackCard from './BlackCard';
import WhiteCards from './WhiteCards';
import PlayerPoints from './PlayerPoints';
import {lang} from './Languages';
import '../components-styles/GameStatus.css'

export default function GameStatus(props) {


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
        
      </div>

      <div id='offeredCards' className='gameDiv cardsBackground'>
        <WhiteCards/>
      </div>

      <div id='playerCards' className='gameDiv cardsBackground'>
        <WhiteCards/>
      </div>
      
    </div>

  )
}
