import React from 'react';
import '../components-styles/Cards.css'
import { serviceendpoint } from './Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {
    
    let [answer, setAnswer] = useState([]);
    let [running, setRunning] = useState();
    //let running= false;

    
    useEffect(() => {
        console.log("ANSWER: " + answer);
        //console.log("RUNNING?: " + running);
        
        fetch('https://gruppe7.toni-barth.com/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++) {
                if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                    if (data.games[i].running === true) {
                        //console.log("HEREEEEE TRUE");
                        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                            .then(response => response.json())
                            .then(data => {
                                let cards = data.cards;
                                setAnswer(cards);
                                setRunning(true);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                        
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


    if ({running}.running === true) {
        return (
            
            <>
                <div className='card white'>
                <p>{{ answer }.answer[0].text} </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[1].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[2].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[3].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[4].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[5].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[6].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[7].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[8].text}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {{ answer }.answer[9].text}
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