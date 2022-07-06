import React from 'react';
import { default as GameURL } from './URL/GameURL';
import { default as PlayerURL } from './URL/PlayerURL';

class PlayerPoints extends React.Component {

    constructor() {
        super();
        this.state = { notice: [] };
        this.playerPoints = this.playerPoints.bind(this);
    }

    playerPoints() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        let gameURL = GameURL();
        let playerURL = PlayerURL();
        let gameId = '';


        playerURL.then(data => {
            var playerId = data.players[data.players.length - 1].id;

            gameURL.then(data => {

                if (data.games.length === 0) {
                    console.log('There are no games yet.');
                }
                for (var i = 0; i < data.games.length; i++) {
                    for (var j = 0; j < data.games[i].players.length; j++) {
                        if (data.games[i].players[j] === playerId) {
                            gameId = data.games[i].id;
                        }
                    }
                }


                for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === gameId) {
                        for (var j = 0; j < data.games[i].players.length; j++) {
                            fetch(serviceendpoint + '/games/' + gameId)
                                .then(res => res.json())
                                .then(gameData => {
                                    this.setState({
                                        notice: this.state.notice.concat([data.games[i].players[j] + '_______' + gameData.points[j]])
                                    });
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }
                    }
                }
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
        })


    }

    componentDidMount() {
        this.playerPoints();
    }

    componentDidUpdate() {
        this.playerPoints();
    }

    render() {
        return (
            <>
                {this.state.notice.map(({ name, id }) => (
                    <p key={id}> {name}</p>
                ))}
            </>
        );
    }
}

export default PlayerPoints;