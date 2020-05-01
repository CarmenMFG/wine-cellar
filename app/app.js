const wineView = new WineView();
const storageService = new StorageService('LocalStorage');
const wineService = new WineService(storageService);
const cartService = new CartService();
const app = new WineController(wineService,cartService,wineView);