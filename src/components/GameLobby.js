import React from 'react'
import '../components-styles/FirstPages.css'
import PlayerList from './PlayerList';
import {lang} from './Languages';
import LeaveGame from './LeaveGame';
import DeleteGame from './DeleteGame';

export default function GameLobby(props) {

  let content = lang;
  props.language === "German"
    ? (content = content.German)
    : (content = content.English);

  return (
    <div className='lobbyLayout'>
        <PlayerList header={content.headerG} startBtn={content.startButton}/>
        <LeaveGame btnLeave={content.leaveButton}/>
        {/*<DeleteGame delGameBtn={content.deleteButton}/>*/}
    </div>
  )
}
