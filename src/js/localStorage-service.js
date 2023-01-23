export class LocalStorageService {
  constructor() {
    this.watchedKey = 'watchedMovies';
    this.queueKey = 'queueMovies';
  }

  save(key, value) {
    try {
      let savedData = localStorage.getItem(key);
      if (savedData) {
        let movieIds = JSON.parse(savedData);
        const isUniqueId = !movieIds.includes(value);
        if (isUniqueId) {
          movieIds.push(value);
          localStorage.setItem(key, JSON.stringify(movieIds));
        } else {
          console.log('This film in your collection');
          // here should be Notify message like 'This film in your collection'
        }
      } else {
        localStorage.setItem(key, JSON.stringify([value]));
      }
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }

  load(key) {
    try {
      const savedData = localStorage.getItem(key);
      return savedData === null ? [] : JSON.parse(savedData);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}
