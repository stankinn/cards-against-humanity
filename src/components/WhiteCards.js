import React from 'react';
import '../components-styles/Cards.css'
import { serviceendpoint, playerID, isGameRunning } from './Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {

    let [answer, setAnswer] = useState([]);

    var gameID = '';
    var isRunning = false;


    fetch(serviceendpoint + '/games/')
    .then(res =>res.json()).then(data => {
            for (var i = 0; i < data.games.length; i++) {
                for (var j = 0; j < data.games[i].players.length; j++) {
                    if (data.games[i].players[j].id === Number(playerID)) {
                        gameID = data.games[i].id;
                        if(data.games[i].running===true){
                            isRunning= true;
                        }else{
                            isRunning= false;
                        }
                    }
                }
            }
            if(isRunning === 'true') {
                fetch(serviceendpoint + '/games/' + gameID + '/cards/' + Number(playerID))
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

        if(isRunning === 'true') {
    return (
        <>
            <div className='card white'>
                   
                <p >{answer[0].text} </p>
                  
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
} else
{
    return (
        <>
            <div className='card white'>
                   
                <p >{} </p>
                  
            </div>
            <div className='card white'>
                <p>
                    {}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {}
                </p>
            </div>
             <div className='card white'>
                <p>
                {}
                </p>
            </div>
            <div className='card white'>
                <p>
                {}
                </p>
            </div>
            <div className='card white'>
                <p>
                {}
                </p>
            </div>
        </>
    );
}
}