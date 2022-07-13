import React from 'react'
import BlackCard from './GameComp/BlackCard';
import WhiteCards from './GameComp/WhiteCards';
import CurCzar from './GameComp/CurCzar';
import OfferedCards from './GameComp/OfferedCards';
import PlayerPoints from './GameComp/PlayerPoints';
import EndGame from './GameComp/EndGame';
import Result from './GameComp/Result';
import {lang} from '../Languages';
import '../components-styles/Game.css'

export default function Game(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className='gameLayout'>

      <div id='blackCard' className='gameDiv'>
        <BlackCard language={props.language}/>
      </div>

      <div id='gameInfo' className='gameDiv'>
        <CurCzar language={props.language}/>
        <PlayerPoints language={props.language}/>
      </div>

      <WhiteCards language={props.language}/>
      <EndGame/>
      <Result language={props.language}/>
    </div>

  )
}
