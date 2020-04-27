class WineService{
    constructor(){
        fetch('../assets/wines.json')
        .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            const myarray=JSON.parse(myJson);
            console.log(myarray);
           /* this.wines=myarray.map(
                wine => console.log(wine))*/
          });
   
       /* fetch('http://127.0.1.1:5000/assets/wines.json')
        .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
          });*/
       
    }
}

  /*   const wines=fetch('./assets/wines.json')
        .then(response => response.json());
        this.wines = wines.map(wine => new Wine(wine));
        }*/