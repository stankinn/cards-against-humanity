import React from 'react'
import NewPlayer from './PlayerActions/addPlayer';
import ShowPlayer from './PlayerActions/getPlayer';
import DeletePlayer from './PlayerActions/deletePlayer';
import '../components-styles/Player.css'
import {lang} from './Languages';

export default function GameStatus(props) {

  function startGame(){
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('gamePage').classList.remove('hidden');
  }

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <>
    <NewPlayer/>
    <DeletePlayer/>
    </>
    // <div id='startLayout'>
    //     <div id='headerP' className='startDiv'>
    //     {content.headerP}
    //     </div>

    //     <div id='headerG'  className='startDiv'>
    //       {content.headerG}
    //     </div>

    //     <div id='listP' className='startDiv list'>
    //       <ShowPlayer/>
    //     </div>

    //     <div id='listG' className='startDiv list'>
    //       <ShowPlayer/>
    //     </div>

    //     <div id='inputP' className='startDiv'>
    //       <input id='nameInput' className='input' maxLength={14}/>
    //     </div>
        
    //     <div id='inputG' className='startDiv'>
    //       <input id='gameInput' className='input' value={''} disabled/>
    //     </div>
        
    //     <div id='btnsP' className='startDiv'>
    //       <button className='btnsStart delBtn'>{content.deleteButton}</button>
    //       <button className='btnsStart'>{content.newButton}</button>
    //     </div>
        
    //     <div id='btnsG' className='startDiv'>
    //       <button className='btnsStart delBtn'>{content.deleteButton}</button>
    //       <button className='btnsStart'>{content.newButton}</button>
    //     </div>
        
    //     <div id='btnSt' className='btnDiv startDiv'>
    //       <button id='btnStart' onClick={startGame}>
    //         {content.playButton}
    //       </button>
    //     </div>
    // </div>

  )
}
