import React from 'react';
import '../components-styles/Cards.css'
import { useState, useEffect } from 'react';
import { serviceendpoint, playerID } from './Imports';


var cardText = [];
var str = '';

export default function BlackCard() {

    let [prompt, setPromt] = useState([]);


    //var gameID = '';
    var isRunning = false;

    fetch('https://gruppe7.toni-barth.com/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++) {

                    if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                        if (data.games[i].running === true) {
                            isRunning = true;
                        } else {
                            isRunning = false;
                        }
                        i = data.games.length;
                        break;
                    }
            }

            //check if game is running: if so, display text
        
            if (isRunning === true) {
                fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')))
                    .then(response => response.json())
                    .then(data => {
                        str = data.currentBlackCard.text;
                        cardText = str.replaceAll('_', ' _______ ');
                        setPromt(cardText);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } else {
                console.log('Black Card cannot be shown. Game is not running yet.');
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log(prompt)

    return (
        <>
            <div className='card black'>

                <p>{prompt}</p>

            </div>
        </>
    );

}