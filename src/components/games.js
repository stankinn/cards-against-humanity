import React, { createElement } from 'react';


class Games extends React.Component {
    
    constructor(){
    super();
    this.state = {notice: false };
    this.checkGames= this.checkGames.bind(this);
    this.addGame = this.addGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.deleteGame= this.deleteGame.bind(this);
    }

    checkGames() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";

        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data=>{
            console.log("all games:" + JSON.stringify(data.games))
            if(data.games.length === 0)
            {
                //addGame();
                console.log("New game is being created")
            }
            else 
            {
                for(var i = 0; i < data.games.length; i++){
                    if (data.games[i].running === false){

                        console.log("joining available game " + JSON.stringify(data.games[i].id))
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
        //spielerID wird herausgefunden
        fetch(serviceendpoint + '/players/')
        .then(response => response.json())
        .then(data=>{
           var id= data.players[data.players.length-1].id;
            console.log("PlayerID:" + id);

            //neues Spiel wird erstellt mit eigener SpielerID
            fetch(serviceendpoint + '/games/', {
                method: "POST",
                body: JSON.stringify({ owner: id}),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data.owner.name)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            });

        
    }

    joinGame(gameID) {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        //spielerID wird herausgefunden
        fetch(serviceendpoint + '/players/')
        .then(response => response.json())
        .then(data=>{
           var id= data.players[data.players.length-1].id;
            console.log("PlayerID:" + id);
            //Freiem Spiel wird beigetreten
                fetch(serviceendpoint + '/games/:'+ gameID, {
                    method: "PATCH",
                    body: JSON.stringify({ player: 0/*Owner ID muss vom Spieler übernommen werden*/, action: "join"}),
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(data=>{
                    console.log(data.games)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    })}

    deleteGame(){


        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data => {var gameID = data.games[data.games.length-1].id;
        
        fetch(serviceendpoint + '/games/' + gameID, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
            });
        })

    }

    render() {
        return (
            <div>
                <button className='button' id= "newGameBtn" onClick={this.addGame}>New Game</button>
                <button className='button' id= "delGameBtn" onClick={this.deleteGame}>Delete Game</button>
            </div>
        );
    }
}

export default Games;