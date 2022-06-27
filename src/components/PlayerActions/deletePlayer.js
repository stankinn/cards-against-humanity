import React from 'react';


class DeletePlayer extends React.Component {
    
    constructor(){
    super();
    this.deletePlayer= this.deletePlayer.bind(this);
    }

    deletePlayer() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/players/:11', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => console.log(response));
    }
    
    render() {
        return (
            <button onClick={this.deletePlayer}>Delete Player</button>
        );
    }
}

export default DeletePlayer;