const localStorageUtil = {
  save: (key: string, data: any) => {
    const dataToString = JSON.stringify(data);
    localStorage.setItem(key, dataToString);
  },
  parse: (key: string) => {
    try {
      const dataFromString = localStorage.getItem(key) as string;
      return JSON.parse(dataFromString);
    } catch (err) {
      console.log(err);
    }
  },
};

export default localStorageUtil;
