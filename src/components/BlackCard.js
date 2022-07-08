import React from 'react';
import '../components-styles/Cards.css'
import { isGameRunning } from './index';
import { useState, useEffect } from 'react';
import { serviceendpoint, playerID } from './Imports';


var cardText = [];
var str = '';

export default function BlackCard() {

    let [prompt, setPromt] = useState('');


    var gameID = '';
    fetch('https://gruppe7.toni-barth.com/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++) {

                for (var j = 0; j < data.games[i].players.length; j++) {

                    if (data.games[i].players[j].id === playerID) {
                        gameID = data.games[i].id;
                        i = data.games.length;
                        break;
                    }
                }
            }

            if (isGameRunning === 'true') {
                fetch(serviceendpoint + '/games/' + gameID)
                    .then(response => response.json())
                    .then(data => {
                        str = data.currentBlackCard.text;
                        cardText = str.replaceAll('_', ' _______ ');
                        setPromt({ cardText });
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


    return (
        <>
            <div className='card black'>
                <p>
                    {prompt}
                </p>
            </div>
        </>
    );

}