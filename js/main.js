const $title = document.querySelector('#inputTitle');
const $url = document.querySelector('#inputUrl');
const $notes = document.querySelector('#inputNotes');
const $img = document.querySelector('img');
const $form = document.querySelector('form');

$url.addEventListener('input', viewImage);

function viewImage(event) {
  $img.src = event.target.value;
  $img.classList.replace('object-cover', 'object-contain');
}

$form.addEventListener('submit', saveEntry);

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
  $img.classList.replace('object-contain', 'object-cover');
  data.nextEntryId++;
  $form.reset();
}
