const $title = document.querySelector('#inputTitle');
const $url = document.querySelector('#inputUrl');
const $notes = document.querySelector('#inputNotes');
const $img = document.querySelector('img');
const $form = document.querySelector('form');

$url.addEventListener('input', viewImage);

function viewImage(event) {
  $img.src = event.target.value;
}

$form.addEventListener('submit', saveEntry);

let entryObjects = [];
const previousEntryObjects = localStorage.getItem(entryObjects);
let nextEntryId = 1;
if (previousEntryObjects != null) {
  entryObjects = JSON.parse(previousEntryObjects);
  nextEntryId = entryObjects[0].nextEntryId + 1;
}

function saveEntry(event) {
  event.preventDefault();
  const entryObj = {
    entryId: nextEntryId,
    title: $title.value,
    imageUrl: $img.src,
    notes: $notes.value
  };
  entryObjects.unshift(entryObj);
  $img.src = 'images/placeholder-image-square.jpg';
  nextEntryId++;
  $form.reset();
}
