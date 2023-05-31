/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previousData = localStorage.getItem('data');

if (previousData != null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', storeData);

function storeData(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}
