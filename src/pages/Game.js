import React, {useState} from 'react'
import BlackCard from './GameComp/BlackCard';
import WhiteCards from './GameComp/WhiteCards';
import CurCzar from './GameComp/CurCzar';
import PlayerPoints from './GameComp/PlayerPoints';
import EndGame from './GameComp/EndGame';
import PopupAnimation from '../Popups/PopupAnimation';
import {lang} from '../Languages';
import '../components-styles/Game.css'
import DeleteGame from './GameLobbyComp/DeleteGame';

export default function Game(props) {

  const [lostPopup, setLostPopup] = useState(false);
  const [wonPopup, setWonPopup] = useState(false);

    let content = lang;
    props.language === "German"
        ? (content = content.German)
        : (content = content.English);

  return (
    <div className='gameLayout'>

      <div id='blackCard' className='gameDiv'>
        <BlackCard/>
      </div>

      <div id='gameInfo' className='gameDiv'>
        <CurCzar/>
        <PlayerPoints/>
      </div>

      <div id='offeredCards' className='gameDiv cardsBackground'>
        <WhiteCards/>
      </div>

      <div id='playerCards' className='gameDiv cardsBackground'>
        <WhiteCards/>
      </div>
      <EndGame/>

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
    </div>

  )
}
