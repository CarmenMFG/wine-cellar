class StorageService{
    constructor({type}){
        this.type=type;
    }
    save(wines){
        localStorage.setItem('wines',JSON.stringify( wines)); 
    }
    getAll(){
        if (type='LocalStorage'){
            return (JSON.parse(localStorage.getItem('wines')) || []).map(
                (wine) => new Wine(wine), ) ;
        
            }
    }
}
