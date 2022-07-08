import localStorageUtil from '../../utils/localStorage.util';

declare global {
  interface Store {}
}

const localStore = {
  save: (store: Store) => localStorageUtil.save('store', store),
  load: () => localStorageUtil.parse('store'),
};

export default localStore;
