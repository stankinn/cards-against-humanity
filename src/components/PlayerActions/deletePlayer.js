import React from 'react';

class DeletePlayer extends React.Component {
    
    constructor(){
    super();
    this.deletePlayer= this.deletePlayer.bind(this);
    }

    deletePlayer() {
        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/players/')
            .then(response => response.json())
            .then(data=>{
                var id= data.players[data.players.length-1].id;
                fetch(serviceendpoint + '/players/' + id, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => console.log(res))
        });
    }
    
    render() {
        return (
            <button className='button' onClick={this.deletePlayer}>Delete Player</button>
        );
    }
}

export default DeletePlayer;