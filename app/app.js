const storageService = new StorageService({
    type: 'localStorage', //localstorage o indexedDB
    configuration: { key: 'id' },
  });
  (async () => {
    try {
      await storageService.initializeDB();
      const wineService = new WineService(storageService);
      const wines = await wineService.loadWinesAwait();
      const wineView = new WineView();
      const carService =new CartService();
      new WineController(wineService,carService, wineView);
    } catch (error) {
      console.error(error);
    }
  })();