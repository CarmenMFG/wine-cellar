class StorageService{
    constructor(type){
        this.type=type;
        let initialWines=[
            {
                "name":"Murmuron",
                "price":10.20,
                "isSaleOn":"Hipercor",
                "imgSrc":"../assets/1.png",
                "foodPairing":null
            },
            {
                "name":"Muñarrate",
                "price":60.60,
                "isSaleOn":"Corte Inglés",
                "imgSrc":"../assets/2.png",
                "foodPairing":null
            },
            {
                "name":"Muñarrate",
                "price":60.60,
                "isSaleOn":"Carrefour",
                "imgSrc":"../assets/2.png",
                "foodPairing":null
            },
            {
                "name":"Excelens",
                "price":8.35,
                "isSaleOn":"Alcampo",
                "imgSrc":"../assets/4.png",
                "foodPairing":null
            },
            {
                "name":"7L",
                "price":15.20,
                "isSaleOn":"Mercadona",
                "imgSrc":"../assets/5.png",
                "foodPairing":null
            }
          ];//Para q esté inicializado con unos cuantos vinos..
          if (type=='LocalStorage'){
            localStorage.setItem("wines",JSON.stringify(initialWines));
          } 
    }

    save(wines){
        alert("entro aqui");
        localStorage.setItem('wines',JSON.stringify(wines)); 
    }
    getAll(){
        if (this.type=='LocalStorage'){
            return (JSON.parse(localStorage.getItem('wines')) || []).map(
                (wine) => new Wine(wine), ) ;
        
            }
    }
}