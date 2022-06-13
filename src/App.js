import './App.css';
import Logo from './images/HSA_Logo.png';
import Popup from './components/Popup';
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
    const closedElements = ['btnMenu', 'hsaLogo', 'btnInfo', 'infoPanel', 'btnHelp'];
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
        <button id='btnHelp' className='closedMenu' onClick={() => setIsOpen(true)}>?</button>
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
        <h3>Hilfe-Fenster</h3>
        <p>Hier werden die Grundfunktionen erklärt!</p>
      </Popup>
    </body>
  )
}
