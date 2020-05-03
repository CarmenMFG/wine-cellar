class StorageService{
    constructor(type){
        this.type=type;
        let initialWines=[
            {   
                "name":"Murmuron",
                "price":10.20,
                "isSaleOn":"Hipercor",
                "imgSrc":"../assets/1.png",
                "foodPairing":[{name:'Patatas',isVegan:true,isGluten:true,kcal:15},{name:'Jamon',isVegan:true,isGluten:true,kcal:23}]
            },
            {    
                "name":"Muñarrate",
                "price":60.60,
                "isSaleOn":"Corte Inglés",
                "imgSrc":"../assets/2.png",
                "foodPairing":[]
            },
            {   
                "name":"Peñafiel",
                "price":60.60,
                "isSaleOn":"Carrefour",
                "imgSrc":"../assets/3.png",
                "foodPairing":[{name:'Pescado',isVegan:true,isGluten:true,kcal:30},{name:'Ternera',isVegan:true,isGluten:true,kcal:30}]
            },
            {   
                "name":"Excelens",
                "price":8.35,
                "isSaleOn":"Alcampo",
                "imgSrc":"../assets/4.png",
                "foodPairing":[]
            },
            {   
                "name":"7L",
                "price":15.20,
                "isSaleOn":"Mercadona",
                "imgSrc":"../assets/6.png",
                "foodPairing":[{name:'Pescado',isVegan:true,isGluten:true,kcal:30}]
            }
          ];//Para q esté inicializado con unos cuantos vinos..
          if (type=='LocalStorage'){
            localStorage.setItem("wines",JSON.stringify(initialWines));
          } 
    }

    save(wines){
        localStorage.setItem('wines',JSON.stringify(wines)); 
    }
    getAll(){
        if (this.type=='LocalStorage'){
            return (JSON.parse(localStorage.getItem('wines')) || []).map(
                (wine) => new Wine(wine), ) ;
        
            }
    }
}