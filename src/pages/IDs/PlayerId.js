export default new Promise(() =>{
        fetch('https://gruppe7.toni-barth.com/players/')
        .then(response => response.json())
        .then(data=>{
            if(data.players.length !== 0){
                data= data.players[data.players.length-1].id;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });