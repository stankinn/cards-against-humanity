import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './components-styles/Menu.css';
import Logo from './images/HSA_Logo.png';
import Popup from './Popups/Popup';
import {lang} from './Languages';

// menu on the top left corner with a help-section, information about HS-Anhalt, theme and language selector
export default function Menu(props) {
    
    let navigate = useNavigate();

    const [helpPopup, setHelpPopup] = useState(false);
    
    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

    function toggleClass(curClass, elementList){
        for (let i = 0; i < elementList.length; i++) {
          document.getElementById(elementList[i]).classList.toggle(curClass);
        }
      }
    
      // open or close menu depending on status
      function menu(){
        const openElements = ['menu', 'bar1', 'bar2', 'bar3'];
        const closedElements = ['btnMenu', 'hsaLogo', 'btnInfo', 'infoPanel', 'btnHelp', 'btnLang', 'btnColor', 'btnPacks'];
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

      function openPacks(){
        navigate('/packInfo');
        menu();
      }

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

        <select id='btnLang' className='menuBtns closedMenu' title='Language' value={props.language} onChange={e => props.handleSetLanguage(e.target.value)}>
          <option className='langOption' value="English">EN</option>
          <option className='langOption' value="German">DE</option>
        </select>

        <button id='btnHelp' className='menuBtns closedMenu' title='Help' onClick={openHelp}>?</button>
          
        <button id='btnColor' className='menuBtns closedMenu' title='Theme' onClick={changeTheme}>
          <div id='colorCircle'/>
        </button>

        <button id='btnPacks' className='menuBtns closedMenu' title='Packs' onClick={openPacks}>
        <div id='cardBot'/>
        <div id='cardTop'/>
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
