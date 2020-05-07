const wineView=  new WineView();
//const storageService= new StorageService({ type:'LocalStorage', configuration:{key:'id'}});indexedDB
const storageService= new StorageService({ type:'localStorage', configuration:{key:'id'}});
const wineService=new WineService(storageService);
const app = new WineController(wineService,wineView);