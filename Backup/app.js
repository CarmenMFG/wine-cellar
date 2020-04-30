const wineView=  new WineView();
const storageService= new StorageService('LocalStorage');
const wineService=new WineService(storageService);
const app = new WineController(wineService,wineView);