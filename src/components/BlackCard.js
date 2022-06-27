import React from 'react';
import '../components-styles/Cards.css'

var cardText = [];
var str = '_ + _ = success. '
//  sdhfbks edifjkdjg sfiuhsjef jhsgd sidfh sfieuhsefe asfiuhasfuj ascouihasfojas asiuhjasfih asiuhjasifjh asfiubafjb asiuhasfijh sfiuhsfodih asicuh souhksvj asifuhaifkj asfjhbafjh asckibafjh.';

class BlackCard extends React.Component {
    
    constructor(){
        super();
        this.state = {notice:[]};
        this.blackCard= this.blackCard.bind(this);
    }

    blackCard() {     

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data=>{

            cardText = str.replaceAll('_', ' _______ ');
            this.setState({notice: cardText});
        })
        .catch((error) => {
            console.error('Error:', error);
            });
        
    }

    componentDidMount() {
       this.blackCard();
     }

    componentDidUpdate(){
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