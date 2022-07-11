import React, {useState} from 'react'
import BlackCard from './GameComp/BlackCard';
import WhiteCards from './GameComp/WhiteCards';
import CurCzar from './GameComp/CurCzar';
import OfferedCards from './GameComp/OfferedCards';
import PlayerPoints from './GameComp/PlayerPoints';
import EndGame from './GameComp/EndGame';
import PopupAnimation from '../Popups/PopupAnimation';
import {lang} from '../Languages';
import '../components-styles/Game.css'

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
        <BlackCard language={props.language}/>
      </div>

      <div id='gameInfo' className='gameDiv'>
        <CurCzar language={props.language}/>
        <PlayerPoints language={props.language}/>
      </div>

      <div id='offeredCards' className='gameDiv cardsBackground'>
        <OfferedCards language={props.language}/>
      </div>

      <div id='playerCards' className='gameDiv cardsBackground'>
        <WhiteCards language={props.language}/>
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
          <div className='popupCutout'>{content.playerLost}</div>
        </div>
      </PopupAnimation>

      <PopupAnimation trigger={wonPopup} setTrigger={setWonPopup}>
        <div className='popupWindow small'>
          <div className='wonAnimation'>
            <div className='bubbles'/>
            <div className='bubbles bubbles2'/>
          </div>
          <div className='popupCutout'>{content.playerWon}</div>
        </div>
      </PopupAnimation>
    </div>

  )
}
