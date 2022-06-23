import React, { createElement } from 'react';


class Games extends React.Component {
    
    constructor(){
    super();
    this.state = {notice: false };
    this.checkGames= this.checkGames.bind(this);
    this.addGame = this.addGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    }

    checkGames() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";

        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data=>{

            if(data.games.length === 0)
            {
                //addGame();
                console.log("New game is being created")
            }
            else 
            {
                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){

                        console.log("joining available game")
                        //joinGame(0/*wird wieder vom spieler übernommen*/);
                        this.setState({notice: data});
                    }
                }
                
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            });
    }

    componentDidMount() {
       this.checkGames();
     }

    addGame() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/', {
            method: "POST",
            body: JSON.stringify({ owner: 0/*Owner ID muss vom Spieler übernommen werden*//* , packs: [0, 5] Packs müssen bei auswahl übernommen werden*/}),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data=>{
           console.log(data.owner)
        })
        .catch((error) => {
            console.error('Error:', error);
            });
    }

    joinGame(gameID) {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/:'+ gameID, {
            method: "PATCH",
            body: JSON.stringify({ player: 0/*Owner ID muss vom Spieler übernommen werden*/, action: "join"}),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data=>{
           console.log(data.player)
        })
        .catch((error) => {
            console.error('Error:', error);
            });
    }

    render() {
        return (
            <button id= "newGameBtn" onClick={this.addGame}>New Game</button>
        );
    }
}

export default Games;