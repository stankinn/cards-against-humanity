import React from 'react';
import '../components-styles/Cards.css'
import { default as gameId } from './IDs/GameId';
import {isGameRunning} from './index';


var cardText = [];
var str = '';

class BlackCard extends React.Component {

    constructor() {
        super();
        this.state = { notice: [] };
        this.blackCard = this.blackCard.bind(this);
    }

    blackCard() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        var gameID='';
        var id = '';
        fetch('https://gruppe7.toni-barth.com/players/')
            .then(response => response.json())
            .then(data => {
                if (data.players.length !== 0) {
                    id = data.players[data.players.length - 1].id;
                    fetch('https://gruppe7.toni-barth.com/games/')
                        .then(response => response.json())
                        .then(data => {
                            for (var i = 0; i < data.games.length; i++) {
                            
                                for (var j = 0; j < data.games[i].players.length; j++) {
                                    
                                    if (data.games[i].players[j].id === id) {
                                        gameID = data.games[i].id;
                                        
                                        i = data.games.length;
                                        break;
                                    }
                                }
                            }
                            console.log('GAME ID: '+ gameID);

                            if (isGameRunning === 'true'){
                            fetch(serviceendpoint + '/games/' + gameID)
                                .then(response => response.json())
                                .then(data => {
                                    str = data.currentBlackCard.text;
                                    cardText = str.replaceAll('_', ' _______ ');
                                    this.setState({ notice: cardText });
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });} else {

                                    console.log('Black Card cannot be shown. Game is not running yet.');
                                }

                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    componentDidMount() {
        this.blackCard();
    }

    componentDidUpdate() {
        this.blackCard();
    }

    render() {
        return (
            <>
                <div className='card black'>
                    <p>
                        {this.state.notice}
                    </p>
                </div>
            </>
        );
    }
}

export default BlackCard;