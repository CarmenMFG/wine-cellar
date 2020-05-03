class StorageService{
    constructor(typeStorage){
        this.storage= typeStorage;  
     }
    getAll(){
        if (this.storage=='LocalStorage'){
         //  let values=Object.values(localStorage);
         //  console.log("Los values del localStorage"+values);
         let arrayValues=[]; 
         for (let  value of Object.values(localStorage)) {
           arrayValues=[...arrayValues,value];
          }
          console.log(typeof(arrayValues));
          console.log("Los values del localStorage"+arrayValues);
            this.wines=values.map(
                          (wine) => new Wine(wine), ); 
                         // console.log("en getAll"+this.wines);
             return this.wines;         
        }   
    }     
    addWine=(wine)=>{
        console.log
        localStorage.setItem(wine.id,JSON.stringify(wine));
    }

}