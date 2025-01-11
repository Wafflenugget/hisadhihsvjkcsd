// Function to save media (video/image) to localStorage
function saveMediaToStorage(mediaData) {
  const media = JSON.parse(localStorage.getItem('media')) || [];
  media.push(mediaData);
  localStorage.setItem('media', JSON.stringify(media));
}

// Function to load media (video/image) from localStorage
function loadMedia() {
  const media = JSON.parse(localStorage.getItem('media')) || [];
  const currentUser = localStorage.getItem('currentUser');

  media.forEach((mediaData) => {
    renderMedia(mediaData, currentUser);
  });
}

// Function to render media (video/image) and the delete button
function renderMedia(mediaData, currentUser) {
  // Check if the media contains the expected properties
  if (!mediaData || !mediaData.src || !mediaData.title || !mediaData.uploader) {
    console.error('Invalid media data:', mediaData);
    return;
  }

  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'media-entry';

  const mediaElement = document.createElement(mediaData.type === 'video' ? 'video' : 'img');
  mediaElement.src = mediaData.src;
  if (mediaData.type === 'video') {
    mediaElement.controls = true;
  }

  const titleBox = document.createElement('div');
  titleBox.className = 'media-title';
  titleBox.innerText = mediaData.title;

  const uploaderBox = document.createElement('div');
  uploaderBox.className = 'media-uploader';
  uploaderBox.innerText = `Uploaded by ${mediaData.uploader}`;

  // Add delete button only if the current user is the uploader
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerHTML = '🗑️'; // Trash icon
  deleteButton.onclick = function () {
    if (mediaData.uploader === currentUser) {
      deleteMedia(mediaData);
    } else {
      alert('You can only delete your own media!');
    }
  };

  mediaContainer.appendChild(mediaElement);
  mediaContainer.appendChild(titleBox);
  mediaContainer.appendChild(uploaderBox);
  mediaContainer.appendChild(deleteButton);

  document.getElementById('mediaContainer').appendChild(mediaContainer);
}

// Function to delete media
function deleteMedia(mediaData) {
  let media = JSON.parse(localStorage.getItem('media')) || [];
  media = media.filter((item) => item.src !== mediaData.src);
  localStorage.setItem('media', JSON.stringify(media));

  // Reload media on the page to reflect the changes
  document.getElementById('mediaContainer').innerHTML = '';
  loadMedia();

  alert('Media deleted successfully!');
}

// Function to handle adding a video or image
function addMedia() {
  const mediaFile = document.createElement('input');
  mediaFile.type = 'file';
  mediaFile.accept = 'image/*, video/*'; // Allow both images and videos

  mediaFile.onchange = function () {
    const file = mediaFile.files[0];
    if (!file) {
      alert('Please select a media file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const mediaTitle = prompt('Enter the title for your media:');
      if (!mediaTitle) {
        alert('Media title cannot be empty!');
        return;
      }

      const currentUser = localStorage.getItem('currentUser') || 'Unknown User';

      const mediaData = {
        src: e.target.result,
        title: mediaTitle,
        uploader: currentUser,
        type: file.type.startsWith('video') ? 'video' : 'image',
      };

      saveMediaToStorage(mediaData);
      renderMedia(mediaData, currentUser);
    };
    reader.readAsDataURL(file);
  };

  mediaFile.click();
}

// Function to handle Sign Up
function signUp() {
  const username = document.getElementById('newUsernameInput').value.trim();
  const password = document.getElementById('newPasswordInput').value.trim();

  if (!username || !password) {
    alert('Please fill in both username and password!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    alert('Username already exists. Please choose another one.');
    return;
  }

  users[username] = password;
  localStorage.setItem('users', JSON.stringify(users));

  alert('Sign Up successful! You can now log in.');
  document.getElementById('newUsernameInput').value = '';
  document.getElementById('newPasswordInput').value = '';
  showSignIn();
}

// Function to handle Log In
function logIn() {
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (!username || !password) {
    alert('Please fill in both username and password!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username] === password) {
    alert(`Welcome back, ${username}!`);
    document.getElementById('welcomeMessage').innerText = `Hello, ${username}!`;
    document.getElementById('welcomeMessage').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signUpForm').classList.add('hidden');
    toggleLoggedInState(true);
    localStorage.setItem('currentUser', username);
  } else {
    alert('Invalid username or password.');
  }
}

// Function to handle Log Out
function logOut() {
  document.getElementById('welcomeMessage').classList.add('hidden');
  toggleLoggedInState(false);
  alert('You have been logged out.');
  localStorage.removeItem('currentUser');
}

// Function to toggle between logged-in and logged-out states
function toggleLoggedInState(isLoggedIn) {
  document.getElementById('logOutButton').classList.toggle('hidden', !isLoggedIn);
  document.getElementById('addMediaButton').classList.toggle('hidden', !isLoggedIn);
  document.getElementById('signUpButton').classList.toggle('hidden', isLoggedIn);
  document.getElementById('signInButton').classList.toggle('hidden', isLoggedIn);
}

// Function to show Sign Up form
function showSignUp() {
  document.getElementById('signUpForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
}

// Function to show Sign In form
function showSignIn() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signUpForm').classList.add('hidden');
}

// Load media on page load
window.onload = function () {
  loadMedia();

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    document.getElementById('welcomeMessage').innerText = `Hello, ${currentUser}!`;
    toggleLoggedInState(true);
  }
};
