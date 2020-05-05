class StorageService{
    constructor(type){
       this.type=type;
            if (this.type=="IndexedDB"){
                this.db = new Dexie("wine_database");
                this.db.version(1).stores({
                wines: 'id'
            });
            }
      
     }

   save(wines){
        localStorage.setItem('wines',JSON.stringify(wines)); 
   }
   saveIDB(wine){
    return this.db.wines.put(wine);

   } 
  getAll(){
     if(this.type=="LocalStorage"){
        return (JSON.parse(localStorage.getItem('wines')) || []).map(
            (wine) => new Wine(wine), ) ;
      }/*else{
        const all = await this.db.wines.toArray();
         const all1 =all.map((wine) => new Wine(wine), ) ;
       
        return all1;  
        }*/
    }         
      /*  let arrWines=[];
         return this.db.wines.each(wine =>{
            //  arrWines=[...arrWines,new Wine(wine)];
               return [...arrWines,new Wine(wine)]});
      } */
   
   }
