import React from 'react';
import '../components-styles/Cards.css'
import { default as GameURL } from './URL/GameURL';
import { default as PlayerURL } from './URL/PlayerURL';
import {isGameRunning} from './index';
import {useState, useEffect} from 'react';

export default function WhiteCards(){

    let [answer, setAnswer] = useState([]);

    //function whiteCardsText() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        var gameID = '';
        fetch('https://gruppe7.toni-barth.com/players/')
            .then(response => response.json())
            .then(data => {
                if (data.players.length !== 0) {
                    var playerId = data.players[data.players.length - 1].id;
                    fetch('https://gruppe7.toni-barth.com/games/')
                        .then(response => response.json())
                        .then(data => {
                            for (var i = 0; i < data.games.length; i++) {
                                for (var j = 0; j < data.games[i].players.length; j++) {
                                    if (data.games[i].players[j].id === playerId) {
                                        gameID = data.games[i].id;
                                    }
                                }
                            }
                            if (isGameRunning() === 'true'){
                            fetch(serviceendpoint + '/games/' + gameID + '/cards/' + playerId)
                                .then(response => response.json())
                                .then(data => {
                                    for (var i = 0; i < 7; i++){
                                    setAnswer(answer[i] = data[i].text);
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                            }else{console.log('White Cards cannot be shown yet. Game is not running')}
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    //}

        return (
            <>
                <div className='card white'>
                    <p>
                        {answer[0]}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[1]}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[2]}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[3]}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[4]}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[5]}
                    </p>
                </div>
                <div className='card white'>
                    <p>
                        {answer[6]}
                    </p>
                </div>
                {/* <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div> */}
            </>
        );
}