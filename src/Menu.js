import React, { useState } from 'react';
import './components-styles/Menu.css';
import Logo from './images/HSA_Logo.png';
import Popup from './Popups/Popup';
import {lang} from './Languages';

export default function Menu(props) {

    const [helpPopup, setHelpPopup] = useState(false);

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

      function openHelp(){
        setHelpPopup(true);
        menu();
      }

      function changeTheme(){
        if (document.body.getAttribute('data-theme') === 'light-theme') {
          document.body.setAttribute('data-theme', 'purple-theme');
        }else if(document.body.getAttribute('data-theme') === 'purple-theme'){
          document.body.setAttribute('data-theme', 'dark-theme'); 
        } else {
          document.body.setAttribute('data-theme', 'light-theme'); 
        }
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

      let content = lang;
      props.language === "German"
          ? (content = content.German)
          : (content = content.English);
  return (
    <>
    <Popup trigger={helpPopup} setTrigger={setHelpPopup}>
      <h2 className='popupTitle'>{content.helpTitle}</h2>
      <p className='popupText'>{content.helpTxt}</p>
    </Popup>

      <div id='menu'>
      <button id='btnMenu' className='closedMenu' onClick={menu}>
        <div id='bar1'/>
        <div id='bar2'/>
        <div id='bar3'/>
      </button>

      <select id='btnLang' className='menuBtns closedMenu' value={props.language} onChange={e => props.handleSetLanguage(e.target.value)}>
        <option className='langOption' value="English">EN</option>
        <option className='langOption' value="German">DE</option>
      </select>

      <button id='btnHelp' className='menuBtns closedMenu' onClick={openHelp}>?</button>
        
      <button id='btnColor' className='menuBtns closedMenu' onClick={changeTheme}>
        <div id='colorCircle'/>
      </button>
      </div>

      <div id='infoPanel' className='closedInfo closedMenu'>
        <div className='infoPanelText'>
            {content.hsaInfo1}<br/>
            <b>HOCHSCHULE ANHALT</b><br/>
            {content.hsaInfo2}<br/>
            <b>TONI BARTH</b> 
        </div>
        <button className='arrow' title='Close' onClick={closeInfo}/>
        <img id='hsaLogo' className='closedInfo closedMenu' alt='HSA_Logo' src={Logo} />
        <button id='btnInfo' className='closedInfo closedMenu' onClick={openInfo} />
      </div>
      
    </>
  )
}
