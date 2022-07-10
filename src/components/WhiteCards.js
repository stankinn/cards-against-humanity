import React from 'react';
import '../components-styles/Cards.css'
import { serviceendpoint } from './Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {

    let [answer, setAnswer] = useState([]);
    let [running, setRunning] = useState(false);

    useEffect(() => {

        whiteCardsText();
        console.log("RUN " + {running}.running + '=== true');
    }, []);

    function whiteCardsText() {
        fetch('https://gruppe7.toni-barth.com/games/')
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.games.length; i++) {

                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            setRunning(true);
                        } else {
                            setRunning(false);
                        }
                        i = data.games.length;
                        break;
                    }
                }
                if ({running}.running === true) {
                    fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                        .then(response => response.json())
                        .then(data => {

                            setAnswer(data.cards);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                
                    } else { console.log('White Cards cannot be shown yet. Game is not running') }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    }

    return (
        <>
            <div className='card white'>
                <p>{{running}.running === true? answer[0].text : ""} </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[1].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[2].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[3].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[4].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true?answer[5].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[6].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[7].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[8].text : ""}
                </p>
            </div>
            <div className='card white'>
                <p>
                {{running}.running === true? answer[9].text : ""}
                </p>
            </div>
        </>
    );
}