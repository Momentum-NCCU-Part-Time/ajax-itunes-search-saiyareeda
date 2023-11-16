function search() {
  const searchTerm = document.getElementById('searchInput').value.trim();

  if (searchTerm === '') {
    displayErrorMessage('Please enter a search term.');
    return;
  }

  const apiUrl = `https://itunes.apple.com/search?term=${searchTerm}&entity=song`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.results.length === 0) {
        displayErrorMessage('No results found.');
      } else {
        displayResults(data.results);
      }
    })
    .catch(error => {
      displayErrorMessage('An error occurred. Please try again.');
      console.error('Error fetching data:', error);
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';
  const songList = document.createElement('ul');
  songList.classList.add('song-list');

  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = result.trackName;
    listItem.addEventListener('click', () => playPreview(result.previewUrl));

    const songDetails = document.createElement('div');
    songDetails.classList.add('song-details');

    const albumImage = document.createElement('img');
    albumImage.src = result.artworkUrl100 || 'placeholder.png';
    albumImage.alt = 'Album Art';

    songDetails.appendChild(albumImage);
    listItem.appendChild(songDetails);

    songList.appendChild(listItem);
  });

  resultsContainer.appendChild(songList);
  clearErrorMessage();
}

function playPreview(previewUrl) {
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = previewUrl;
  audioPlayer.play();
  console.log(audioPlayer.title);

  document.getElementById('nowPlayingText').textContent = 'Now Playing: ' + audioPlayer.collectionName;
}

function displayErrorMessage(message) {
  const errorContainer = document.getElementById('error-message');
  errorContainer.textContent = message;
  setTimeout(() => {
    errorContainer.textContent = '';
  }, 3000);
}

function clearErrorMessage() {
  const errorContainer = document.getElementById('error-message');
  errorContainer.textContent = '';
}