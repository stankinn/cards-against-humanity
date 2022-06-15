import './App.css';
import Logo from './images/HSA_Logo.png';
import Popup from './components/Popup';
import PopupS from './components/PopupSmall';
import React, { useState } from 'react';
// import{ useState } from 'react';

export default function App(){

  const [isOpen, setIsOpen] = useState(false);

  function toggleClass(curClass, elementList){
    for (let i = 0; i < elementList.length; i++) {
      document.getElementById(elementList[i]).classList.toggle(curClass);
    }
  }

  function menu(){
    const openElements = ['menu', 'bar1', 'bar2', 'bar3'];
    const closedElements = ['btnMenu', 'hsaLogo', 'btnInfo', 'infoPanel', 'btnHelp', 'btnLang', 'btnColor'];
    toggleClass('open', openElements);
    toggleClass('closedMenu', closedElements);
    closeInfo();
  }

  function openInfo(){
    document.getElementById('btnInfo').classList.add('hidden');
    document.getElementById('infoPanel').classList.remove('closedInfo');
    document.getElementById('hsaLogo').classList.remove('closedInfo');
  }

  function closeInfo(){
    document.getElementById('btnInfo').classList.remove('hidden');
    document.getElementById('infoPanel').classList.add('closedInfo');
    document.getElementById('hsaLogo').classList.add('closedInfo');
  }

  return(
    <body>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/>
      <br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <div>
        Other Content
      </div>
      <div id='menu'>
        <div id='btnMenu' className='closedMenu' onClick={menu}>
          <div id='bar1'/>
          <div id='bar2'/>
          <div id='bar3'/>
        </div>
        <div id='btnLang' className='menuBtns closedMenu'>DE</div>
        <button id='btnHelp' className='menuBtns closedMenu' onClick={() => setIsOpen(true)}>?</button>
        <div id='btnColor' className='menuBtns closedMenu'>
          <div id='colorCircle'/>
        </div>
      </div>

      <div id='infoPanel' className='closedInfo closedMenu'>
        <div className='infoPanelText'>
          Ein Projekt an der<br/>
          <b>HOCHSCHULE ANHALT</b><br/>
          unter der Aufsicht von<br/>
          <b>TONI BARTH</b>
        </div>
        <button className='arrow' title='Close' onClick={closeInfo}/>
        <img id='hsaLogo' className='closedInfo closedMenu' alt='HSA_Logo' src={Logo} />
        <button id='btnInfo' className='closedInfo closedMenu' onClick={openInfo} />
      </div>
      
      <Popup trigger={isOpen} setTrigger={setIsOpen}>
        <h className='popupTitle'>Hilfe-Fenster</h>
        <p className='popupText'>Hier werden die Grundfunktionen erklärt!</p>
      </Popup>
      
      <PopupS trigger={isOpen} setTrigger={setIsOpen}>
        <div className='animationContainer'>
            <div class="drop">⬤</div>
            <div class="drop">⬤</div>
            <div class="drop">⬤</div>
            <div class="drop">⬤</div>
            <div class="drop">⬤</div>
            <div class="drop">⬤</div>
            <div class="drop">⬤</div>
        </div>
        <div className='bubbles hidden'/>
        <div className='bubbles bubbles2 hidden'/>
        <div className='popupCutout'>GEWONNEN</div>
      </PopupS>
    </body>
  )
}
