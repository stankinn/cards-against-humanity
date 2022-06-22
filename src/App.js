import './App.css';
import Menu from './components/Menu'
import PopupAnimation from './components/PopupAnimation';
import React, { useState } from 'react';

export default function App(){

  const [lostPopup, setLostPopup] = useState(false);
  const [wonPopup, setWonPopup] = useState(false);

  let languageStoredInLocalStorage = localStorage.getItem("language");
  let [language, setLanguage] = useState(
    languageStoredInLocalStorage ? languageStoredInLocalStorage : "English"
  );

  return(
    <body>

      <Menu language={language} handleSetLanguage={language =>{
        setLanguage(language);}}/>
      
      <button onClick={() => setLostPopup(true)}> Verloren </button>
      <button onClick={() => setWonPopup(true)}> Gewonnen </button>
      
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
