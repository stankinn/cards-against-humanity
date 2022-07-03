import React from 'react';
import { gameId } from './GameId';

class PlayerPoints extends React.Component {
    
    constructor(){
        super();
        this.state = {notice: []};
        this.playerPoints= this.playerPoints.bind(this);
    }

    playerPoints() {     

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data=>{
            for(var i = 0; i < data.games.length; i++){
                if(data.games[i].id === gameId){
                    for(var j = 0; j < data.games[i].players.length; j++){
                        fetch(serviceendpoint + '/games/' + gameId)
                        .then(res => res.json())
                        .then(gameData=>{
                            this.setState({
                                notice: this.state.notice.concat([data.games[i].players[j] + '_______' + gameData.points[j]])});
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
        
    }

    componentDidMount() {
       this.playerPoints();
     }

    componentDidUpdate(){
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