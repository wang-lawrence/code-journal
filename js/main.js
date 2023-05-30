const $url = document.querySelector('#inputUrl');
const $img = document.querySelector('img');

$url.addEventListener('input', viewImage);

function viewImage(event) {
  $img.src = event.target.value;
}
