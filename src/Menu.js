import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './components-styles/Menu.css';
import Logo from './images/HSA_Logo.png';
import CzarChooseDE from './images/CzarChooseDE.gif';
import CzarChooseEN from './images/CzarChooseEN.gif';
import CzarDE from './images/CzarDE.jpg';
import CzarEN from './images/CzarEN.jpg';
import EndDE from './images/EndDE.gif';
import EndEN from './images/EndEN.gif';
import GameDE from './images/GameDE.gif';
import GameEN from './images/GameEN.gif';
import JoinLeaveDE from './images/JoinLeaveDE.gif';
import JoinLeaveEN from './images/JoinLeaveEN.gif';
import Language from './images/Language.gif';
import PlayerChooseDE from './images/PlayerChooseDE.gif';
import PlayerChooseEN from './images/PlayerChooseEN.gif';
import PlayerDE from './images/PlayerDE.gif';
import PlayerEN from './images/PlayerEN.gif';
import Popup from './Popups/Popup';
import {lang} from './Languages';

// menu on the top left corner with a help-section, information about HS-Anhalt, theme and language selector
export default function Menu(props) {
    
  let navigate = useNavigate();
  const location = useLocation();

  const [helpPopup, setHelpPopup] = useState(false);
  const [helpPage, setHelpPage] = useState(1);
  const [pageBefore, setPageBefore] = useState(1);

  let popupHelp;
  let helpCzarChoose;
  let helpCzar;
  let helpEnd;
  let helpGame;
  let helpJoinLeave;
  let helpPlayerChoose;
  let helpPlayer;
    
  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  // set the right Language gif
  if(props.language === "German"){
    helpCzarChoose = CzarChooseDE;
    helpCzar = CzarDE;
    helpEnd = EndDE;
    helpGame = GameDE;
    helpJoinLeave = JoinLeaveDE;
    helpPlayerChoose = PlayerChooseDE;
    helpPlayer = PlayerDE;
  }else{
    helpCzarChoose = CzarChooseEN;
    helpCzar = CzarEN;
    helpEnd = EndEN;
    helpGame = GameEN;
    helpJoinLeave = JoinLeaveEN;
    helpPlayerChoose = PlayerChooseEN;
    helpPlayer = PlayerEN;
  }

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

  // changes Help Page on different paths and changes the Help Page on Arrow Button
  useEffect(()=>{
    const interval = setInterval(() => {
      if(helpPopup === false){
        if(location.pathname.includes('/lobby')){
          setHelpPage(2);
        } else if(location.pathname === '/game'){
          setHelpPage(3);
        } else{
          setHelpPage(1);
        }
      }
      if(pageBefore !== helpPage){
        if(helpPage < 1){
          changeCont(4);
        }else if(helpPage > 4){
          changeCont(1);
        }else{
          changeCont(helpPage);
        }
      }
    }, 250);
    return () => clearInterval(interval);
  })

  function changeCont(curCont){

    switch (curCont) {
      case 2:
        setHelpPage(2);
        break;
      case 3:
        setHelpPage(3);
        break;
      case 4:
        setHelpPage(4);
        break;
      default:
        setHelpPage(1);
        break;
    }
    setPageBefore(curCont);
  }

  // sets the correct Help Content for the current Help Page
  if(helpPage === 2){
    popupHelp = <Popup trigger={helpPopup} setTrigger={setHelpPopup} contPage={helpPage} setPage={setHelpPage}
                  header1={content.helpTitle3} text1={content.helpTxt3} image1={helpJoinLeave}
                  header2={content.helpTitle4} text2={content.helpTxt4} image2={helpGame}/>;
  }else if(helpPage === 3){
    popupHelp = <Popup trigger={helpPopup} setTrigger={setHelpPopup} contPage={helpPage} setPage={setHelpPage}
                  header1={content.helpTitle5} text1={content.helpTxt5_1} image1={helpCzar}
                  header2={null} text2={content.helpTxt5_2} image2={helpPlayerChoose}/>;
  }else if(helpPage === 4){
    popupHelp = <Popup trigger={helpPopup} setTrigger={setHelpPopup} contPage={helpPage} setPage={setHelpPage}
                  header1={content.helpTitle5} text1={content.helpTxt5_3} image1={helpCzarChoose}
                  header2={null} text2={content.helpTxt5_4} image2={helpEnd}/>;
  }else{
    popupHelp = <Popup trigger={helpPopup} setTrigger={setHelpPopup} contPage={helpPage} setPage={setHelpPage}
                  header1={content.helpTitle1} text1={content.helpTxt1} image1={Language}
                  header2={content.helpTitle2} text2={content.helpTxt2} image2={helpPlayer}/>;
  }

  return (
    <>
      {popupHelp}

      <div id='menu'>
        <button id='btnMenu' className='closedMenu' title='Menu' onClick={menu}>
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
        <button id='btnInfo' className='closedInfo closedMenu' title='Information' onClick={openInfo} />
      </div>
      
    </>
  )
}
