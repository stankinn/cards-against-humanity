import './App.css';
import React, { useState } from 'react';
import {Menu, Player, NewGame, PopupAnimation, ShowGames, GameStatus} from './components';


export default function App(){

    const [lostPopup, setLostPopup] = useState(false);
    const [wonPopup, setWonPopup] = useState(false);
  
    let languageStored = localStorage.getItem("language");
    let [language, setLanguage] = useState(
      languageStored ? languageStored : "English"
    );

  return(
    <>
        <div id='startPage' className=''>
            <Player language={language}/>
            <NewGame/>
            <ShowGames/>
        </div>
        
        <button onClick={() => setLostPopup(true)}> Verloren </button>
        <button onClick={() => setWonPopup(true)}> Gewonnen </button>
      
        <div id='gamePage' className='hidden'>
          <GameStatus language={language}/>
        </div>
        
        <Menu language={language} handleSetLanguage={language =>{
            setLanguage(language);
            storeLanguage(language);
            }}/>
      
        <PopupAnimation trigger={lostPopup} setTrigger={setLostPopup}>
            <div className='popupWindow small lost'>
                <div className='lostAnimation'>
                    <div className="drop">⬤</div>
                    <div className="drop">⬤</div>
                    <div className="drop">⬤</div>
                    <div className="drop">⬤</div>
                    <div className="drop">⬤</div>
                    <div className="drop">⬤</div>
                    <div className="drop">⬤</div>
                </div>
                <div className='popupCutout'>VERLOREN</div>
            </div>
        </PopupAnimation>

        <PopupAnimation trigger={wonPopup} setTrigger={setWonPopup}>
            <div className='popupWindow small'>
                <div className='wonAnimation'>
                    <div className='bubbles'/>
                    <div className='bubbles bubbles2'/>
                </div>
                <div className='popupCutout'>GEWONNEN</div>
            </div>
        </PopupAnimation>

    </>
  )
}

function storeLanguage(language) {
  localStorage.setItem("language", language);
}