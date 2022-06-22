import './App.css';
import Menu from './components/Menu'
import PopupAnimation from './components/PopupAnimation';
import React, { useState } from 'react';
import ShowGames from './Games/getGames.js';
import NewGame from './Games/addGame.js';

export default function App(){

    const [lostPopup, setLostPopup] = useState(false);
    const [wonPopup, setWonPopup] = useState(false);
  
    let languageStoredInLocalStorage = localStorage.getItem("language");
    let [language, setLanguage] = useState(
      languageStoredInLocalStorage ? languageStoredInLocalStorage : "English"
    );

  return(
    <body>
        <div>
            <NewGame/>
        </div>

        <div>
            <ShowGames/>
        </div>
        
        <button onClick={() => setLostPopup(true)}> Verloren </button>
        <button onClick={() => setWonPopup(true)}> Gewonnen </button>
      
        <Menu language={language} handleSetLanguage={language =>{
            setLanguage(language);}}/>
      
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

    </body>
  )
}