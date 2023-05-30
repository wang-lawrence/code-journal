/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', storeData);

function storeData(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

const previousData = localStorage.getItem('data');

if (previousData != null) {
  data = JSON.parse(previousData);
}
