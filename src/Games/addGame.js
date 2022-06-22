import React from 'react';


class NewGame extends React.Component {
    
    constructor(){
    super();
    this.addGame= this.addGame.bind(this);
    }

    addGame() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        //beispielcode funktioniert noch nicht, es wurde noch kein spieler erstellt und es wurden noch keine packs hinzugefügt
        fetch(serviceendpoint + '/games/', {
            method: "POST",
            body: JSON.stringify({ owner: 0, packs: [0, 5]}),
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
    
    render() {
        return (
            <button onClick={this.addGame}>New Game</button>
        );
    }
}

export default NewGame;