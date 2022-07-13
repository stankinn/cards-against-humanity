import React, {useState, useEffect} from 'react'
import { serviceendpoint } from '../Imports';
import {lang} from '../../Languages';
import PopupAnimation from '../../Popups/PopupAnimation';

export default function Result(props) {

    const [lostPopup, setLostPopup] = useState(false);
    const [wonPopup, setWonPopup] = useState(false);

    useEffect(() =>{
        const interval = setInterval(() => {
            fetch(serviceendpoint + '/games/')
            .then(res => res.json())
            .then(data => {
              for(var i = 0; i < data.games.length; i++){
                if(data.games[i].id === Number(sessionStorage.getItem('gameID'))){
                    // console.log('.winner: ' + data.games[i].winner);
                    if(data.games[i].winner){
                        console.log('there is a winner: ' + JSON.stringify(data.games[i].winner))
                        if(data.games[i].winner.id === Number(localStorage.getItem('playerID'))){
                            setWonPopup(true);
                        }else{
                            setLostPopup(true);
                        }
                    }
                }
              }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }, 1000);
        return () => clearInterval(interval);
      }, []);
     
    let content = lang;
    props.language === "German"
      ? (content = content.German)
      : (content = content.English);

  return (
    <>
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
    </>
  )
}
