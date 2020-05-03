const wineView = new WineView();
const storageService = new StorageService('localStorage');
const wineService = new WineService(storageService);
const cartService = new CartService();
const app = new WineController(wineService,cartService,wineView);