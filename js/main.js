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

// const previousDataModel = localStorage.getItem(data);
// const entries = data.entries;
// const nextEntryId = data.nextEntryId;

// if (previousDataModel != null) {
//   data = JSON.parse(previousDataModel);
//   entries = data.entries;
//   nextEntryId = data.nextEntryId + 1;
// }

function saveEntry(event) {
  event.preventDefault();
  const entryObj = {
    entryId: data.nextEntryId,
    title: $title.value,
    imageUrl: $img.src,
    notes: $notes.value
  };
  data.entries.unshift(entryObj);
  $img.src = 'images/placeholder-image-square.jpg';
  data.nextEntryId++;
  $form.reset();
}
