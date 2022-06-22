import React from 'react';


class ShowGames extends React.Component {
    
    constructor(){
    super();
    this.state = {notice: ''};
    this.showGames= this.showGames.bind(this);
    }

    showGames() {

        const serviceendpoint = "https://gruppe7.toni-barth.com";

        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data=>{
            if(data.games.length === 0)
            {
                this.setState({notice: 'No game has been set yet'});
            }
            else
            {
                this.setState({notice: data});
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            });
    }

    componentDidMount() {
       this.showGames();
     }

    componentDidUpdate(){
        this.showGames();
    }
    
    render() {
        return (
            <h2>{this.state.notice}</h2>
        );
    }
}

export default ShowGames;