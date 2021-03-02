function localStorageFunction(data) {
  let lsData = JSON.parse(localStorage.getItem('lsData') || '[]');
  lsData.push(data);
  localStorage.setItem('lsData', JSON.stringify(lsData));
}

export default localStorageFunction;
