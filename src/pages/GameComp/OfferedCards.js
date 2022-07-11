import React from 'react';
import '../../components-styles/Cards.css'
import { serviceendpoint } from '../Imports';
import { useState, useEffect } from 'react';

export default function WhiteCards() {
    
    let [running, setRunning] = useState();
    //let running= false;

    
    useEffect(() => {

        //check if game running
        fetch('https://gruppe7.toni-barth.com/games/')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.games.length; i++) {
                if (data.games[i].id === Number(sessionStorage.getItem('gameID'))) {
                    if (data.games[i].running === true) {
                        fetch(serviceendpoint + '/games/' + Number(sessionStorage.getItem('gameID')) + '/cards/' + Number(localStorage.getItem('playerID')))
                            .then(response => response.json())
                            .then(() => {
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
                <div className='card white' onClick={()=>makeList(0)}>
                    <p >
                        {} 
                    </p>
                </div>
            </>
        );
    } else {
        return (
            <>
                
            </>
        );
    }

}