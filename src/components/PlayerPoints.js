import React from 'react';
import { serviceendpoint, gameURL, playerURL } from './Imports';
import { isGameRunning } from './index';

class PlayerPoints extends React.Component {

    constructor() {
        super();
        this.state = { notice: [] };
        this.playerPoints = this.playerPoints.bind(this);
    }

    playerPoints() {

        let gameId = '';


        playerURL.then(data => {
            var playerId = data.players[data.players.length - 1].id;

            gameURL.then(data => {

                if (data.games.length === 0) {
                    console.log('There are no games yet.');
                }
                for (var i = 0; i < data.games.length; i++) {
                    for (var j = 0; j < data.games[i].players.length; j++) {
                        if (data.games[i].players[j].id === playerId) {
                            gameId = data.games[i].id;
                        }
                    }
                }
                if (isGameRunning === 'false') {

                    fetch(serviceendpoint + '/games/' + gameId)
                        .then(res => res.json())
                        .then(gameData => {

                            for (var j = 0; j < gameData.players.length; j++) {
                                this.setState({
                                    notice: this.state.notice.concat([gameData.players[j].name + '_______' + gameData.points[j]])
                                });
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else { console.log("No points. Game is not running yet."); }

                /*for (var i = 0; i < data.games.length; i++) {
                    if (data.games[i].id === gameId) {
                        for (var j = 0; j < data.games[i].players.length; j++) {
                            fetch(serviceendpoint + '/games/' + gameId)
                                .then(res => res.json())
                                .then(gameData => {
                                    this.setState({
                                        notice: this.state.notice.concat([data.games[i].players[j].name + '_______' + gameData.points[j]])
                                    });
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }
                    }
                }*/
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