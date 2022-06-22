import React, { useState, Fragment } from 'react';
// import ReactHtmlParser from 'react-html-parser';
import '../components-styles/Menu.css';
import Logo from '../images/HSA_Logo.png';
import Popup from './Popup';
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

      function changeTheme(){
        if (document.body.getAttribute('data-theme') === 'light-theme') {
          document.body.setAttribute('data-theme', 'fire-theme');
        }else if(document.body.getAttribute('data-theme') === 'fire-theme'){
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
      <h className='popupTitle'>Hilfe-Fenster</h>
      <p className='popupText'>Hier werden die Grundfunktionen erklärt!</p>
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

      <button id='btnHelp' className='menuBtns closedMenu' onClick={() => setHelpPopup(true)}>?</button>
        
      <button id='btnColor' className='menuBtns closedMenu' onClick={changeTheme}>
        <div id='colorCircle'/>
      </button>
      </div>

      <div id='infoPanel' className='closedInfo closedMenu'>
        <div className='infoPanelText'>
          <Fragment>
            {content.hsaInfo1}<br/>
            <b>HOCHSCHULE ANHALT</b><br/>
            {content.hsaInfo2}<br/>
            <b>TONI BARTH</b> 
          </Fragment>
        </div>
        <button className='arrow' title='Close' onClick={closeInfo}/>
        <img id='hsaLogo' className='closedInfo closedMenu' alt='HSA_Logo' src={Logo} />
        <button id='btnInfo' className='closedInfo closedMenu' onClick={openInfo} />
      </div>
      
    </>
  )
}
