const $title = document.querySelector('#inputTitle');
const $url = document.querySelector('#inputUrl');
const $notes = document.querySelector('#inputNotes');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $noEntries = document.querySelector('#no-entries');
const $entriesAnchor = document.querySelector('#entries-anchor');
const $entryFormAnchor = document.querySelector('#entry-form-anchor');
const $entryForm = document.querySelector('#entry-form');
const $entries = document.querySelector('#entries');
const $newEntryHeader = document.querySelector('span[data-form-type="new-entry"]');
const $editEntryHeader = document.querySelector('span[data-form-type="edit-entry"]');

$url.addEventListener('input', viewImage);

function viewImage(event) {
  $img.src = event.target.value;
  $img.classList.replace('object-cover', 'object-contain');
}

$form.addEventListener('submit', saveEntry);

function saveEntry(event) {
  event.preventDefault();
  if (data.editing === null) {
    const entryObj = {
      entryId: data.nextEntryId,
      title: $title.value,
      imageUrl: $url.value,
      notes: $notes.value
    };
    data.entries.unshift(entryObj);
    $img.src = 'images/placeholder-image-square.jpg';
    $img.classList.replace('object-contain', 'object-cover');
    data.nextEntryId++;
    $form.reset();
    $ul.prepend(renderEntry(entryObj));
    viewSwap('entries');
    if (data.nextEntryId === 2) {
      toggleNoEntries();
    }
  } else {
    const entryObj = {
      entryId: data.editing.entryId,
      title: $title.value,
      imageUrl: $url.value,
      notes: $notes.value
    };
    const entryObjIndex = data.entries.length - entryObj.entryId;
    const $entryListItem = document.querySelector(`[data-entry-id="${entryObj.entryId}"]`);
    // console.dir($entryListItem);
    data.entries.splice(entryObjIndex, 1, entryObj);
    $img.src = 'images/placeholder-image-square.jpg';
    $img.classList.replace('object-contain', 'object-cover');

    $entryListItem.replaceWith(renderEntry(entryObj));
    viewSwap('entries');
    data.editing = null;
    formTypeSwap(data.editing);
    $form.reset();
  }
}

function renderEntry(entry) {
  const $li = document.createElement('li');
  const $div1 = document.createElement('div');
  const $div2 = document.createElement('div');
  const $div3 = document.createElement('div');
  const $div4 = document.createElement('div');
  const $img = document.createElement('img');
  const $h2 = document.createElement('h2');
  const $i = document.createElement('i');
  const $p = document.createElement('p');

  $li.setAttribute('data-entry-id', entry.entryId);
  $li.setAttribute('class', 'margin-bottom-rem');
  $div1.setAttribute('class', 'row');
  $div2.setAttribute('class', 'column-half');
  $div3.setAttribute('class', 'column-half');
  $div4.setAttribute('class', 'row justify-space-bw align-items');
  $img.setAttribute('src', entry.imageUrl);
  $img.setAttribute('alt', entry.title);
  $img.setAttribute('class', 'object-contain');
  $h2.textContent = entry.title;
  $i.setAttribute('class', 'fa-solid fa-pen fa-xl icon');
  $p.textContent = entry.notes;

  $li.append($div1);
  $div1.append($div2, $div3);
  $div2.append($img);
  $div3.append($div4, $p);
  $div4.append($h2, $i);

  return $li;
}

document.addEventListener('DOMContentLoaded', renderAllEntries);

function renderAllEntries(event) {

  const entriesCount = data.entries.length;

  if (entriesCount > 0) {
    toggleNoEntries();
  }

  for (let i = 0; i < entriesCount; i++) {
    $ul.append(renderEntry(data.entries[i]));
  }

  viewSwap(data.view);
}

function toggleNoEntries() {
  $noEntries.classList.toggle('hidden');
}

$entriesAnchor.addEventListener('click', toggleEntryView);
$entryFormAnchor.addEventListener('click', toggleEntryView);

function toggleEntryView(event) {
  const dataView = event.target.getAttribute('data-view');
  viewSwap(dataView);
}

function viewSwap(dataView) {
  if (dataView === 'entry-form') {
    $entries.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    data.view = 'entry-form';
  } else {
    $entries.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    data.view = 'entries';
  }
}

$ul.addEventListener('click', editEntry);

function editEntry(event) {
  viewSwap('entry-form');
  const dataEntryId = (event.target.closest('li').getAttribute('data-entry-id'));
  const entryIdObj = data.entries[data.entries.length - dataEntryId];
  data.editing = entryIdObj;
  $title.value = data.editing.title;
  $url.value = data.editing.imageUrl;
  $notes.value = data.editing.notes;
  $img.src = $url.value;
  $img.classList.replace('object-cover', 'object-contain');
  formTypeSwap(data.editing);
}

function formTypeSwap(editData) {
  if (editData != null) {
    $newEntryHeader.classList.add('hidden');
    $editEntryHeader.classList.remove('hidden');
  } else {
    $newEntryHeader.classList.remove('hidden');
    $editEntryHeader.classList.add('hidden');
  }
}
