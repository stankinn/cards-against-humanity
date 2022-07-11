import './App.css';
import React, { useState } from 'react';
import {PlayerCreation ,Game, Menu, PopupAnimation, GameLobby} from './components';



export default function App(){


    const [lostPopup, setLostPopup] = useState(false);
    const [wonPopup, setWonPopup] = useState(false);

    sessionStorage.clear();

  
    let languageStored = localStorage.getItem("language");
    let [language, setLanguage] = useState(
      languageStored ? languageStored : "English"
    );


  return(
    <>      
      <div className='page'>
        <Game language={language}/>
      </div>

      <div id='gameLobby' className='page '>
        <GameLobby language={language}/>
      </div>

      <div id='playerCreation' className='page '>
        <PlayerCreation language={language}/>
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