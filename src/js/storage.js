const saveLocSt = (key, value) => {
  try {
    const localState = JSON.stringify(value);
    localStorage.setItem(key, localState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};
 
const loadLocSt = key => {
  try {
    const localState = localStorage.getItem(key);
    return localState === null ? undefined : JSON.parse(localState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const removeLocSt = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function addListLibrary(id, select) {
  const sel = select + 'Data';
  const moviesData = loadLocSt('moviesData');
  const movieData = moviesData.find(movie => movie.id === id);
  const librArr = loadLocSt(select) ? loadLocSt(select) : [];
  const librData = loadLocSt(sel) ? loadLocSt(sel) : [];
  const index = librArr.indexOf(id);
  if (index < 0) {
    librArr.push(id);
    librData.push(movieData);
  } else {
    librArr.splice(index, 1);
    librData.splice(index, 1);
  }
  saveLocSt(select, librArr);
  saveLocSt(sel, librData);
}

export { saveLocSt };
export function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}
