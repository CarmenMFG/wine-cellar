class StorageService{
    constructor(typeStorage){
        this.storage= typeStorage;  
       
     
    }
    getAll(){
        if (this.storage=='localStorage'){
            let values=Object.values(localStorage);
           this.wines= (JSON.parse(values) || []).map(
                          wine => new Wine(wine) ); 
                          console.log("en getAll"+this.wines);
           // console.log("En getAll"+this.wines);     
           return this.wines;         
        }   
    }     
    addWine=(wine)=>{
        localStorage.setItem(wine.id,JSON.stringify(wine));
    }

}