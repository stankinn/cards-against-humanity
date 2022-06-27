import React from 'react';
import '../components-styles/Cards.css'

class WhiteCards extends React.Component {
    
    constructor(){
        super();
        this.state = {notice:''};
        this.whiteCards= this.whiteCards.bind(this);
    }

    whiteCards() {     

        const serviceendpoint = "https://gruppe7.toni-barth.com";
        fetch(serviceendpoint + '/games/')
        .then(response => response.json())
        .then(data=>{
            this.setState({notice: 'a hungry burger'});
        })
        .catch((error) => {
            console.error('Error:', error);
            });
        
    }

    componentDidMount() {
       this.whiteCards();
     }

    componentDidUpdate(){
        this.whiteCards();
    }
    
    render() {
        return (
            <>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            {/* <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div>
            <div className='card white'>
                <p>
                    {this.state.notice}
                </p>
            </div> */}
            </>
        );
    }
}

export default WhiteCards;