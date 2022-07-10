import React from 'react';
import '../components-styles/Cards.css'
import { serviceendpoint } from './Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {

    let [answer, setAnswer] = useState([]);
    let [running, setRunning] = useState();

    
    useEffect(() => {
        fetch('https://gruppe7.toni-barth.com/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            console.log("HEREEEEE TRUE");
                            fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                            .then(response => response.json())
                            .then(data => {
                                console.log("SETTING TEXT: " + JSON.stringify(data.cards));
                                setAnswer(data.cards);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                            setRunning(true);
                        } else {
                            console.log('White Cards cannot be shown yet. Game is not running') 
                            setRunning(false);
                        }
                        i = data.games.length;
                        break;
                    }
                }
            })
    }, [])

    //console.log("RUN " + { running }.running + '=== true');

    if ({ running }.running === true) {
        return (
            <>
                <div className='card white'>
                    <p>{answer[0].text} </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[1].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[2].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[3].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[4].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[5].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[6].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[7].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[8].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[9].text}
                    </p>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className='card white'>
                    <p> </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
                <div className='card white'>
                    <p>
                    </p>
                </div>
            </>
        );
    }

}