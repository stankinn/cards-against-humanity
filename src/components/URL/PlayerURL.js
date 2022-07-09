export default async() =>{

    const urlP= 'https://gruppe7.toni-barth.com/players/';
    let responseP= await fetch(urlP);
    return responseP = responseP.json();
    };