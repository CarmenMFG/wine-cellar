  const storageService = new StorageService({
    type: 'localStorage', //localstorage o indexedDB o dixie
    configuration: { key: 'id' },
  });
 
 (async () => {
    try {
     await storageService.initializeDB();
     const wineService = new WineService(storageService);
     const wines = await wineService.loadWinesAwait();
     const wineView = new WineView();
     new WineController(wineService, wineView);
    } catch (error) {
      console.error(error);
    }
  })();
  