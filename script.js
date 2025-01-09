// Function to show the Sign Up form
function showSignUp() {
  document.getElementById('signUpForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
}

// Function to show the Log In form
function showSignIn() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signUpForm').classList.add('hidden');
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
    localStorage.setItem('currentUser', username); // Save the current user
  } else {
    alert('Invalid username or password.');
  }
}

// Function to handle Log Out
function logOut() {
  document.getElementById('welcomeMessage').classList.add('hidden');
  toggleLoggedInState(false);
  alert('You have been logged out.');
  localStorage.removeItem('currentUser'); // Remove current user
}

// Function to toggle between logged-in and logged-out states
function toggleLoggedInState(isLoggedIn) {
  document.getElementById('logOutButton').classList.toggle('hidden', !isLoggedIn);
  document.getElementById('addVideoButton').classList.toggle('hidden', !isLoggedIn);
  document.getElementById('signUpButton').classList.toggle('hidden', isLoggedIn);
  document.getElementById('signInButton').classList.toggle('hidden', isLoggedIn);
}

// Function to handle adding a video
function addVideo() {
  const videoFile = document.createElement('input');
  videoFile.type = 'file';
  videoFile.accept = 'video/*';

  videoFile.onchange = function () {
    const file = videoFile.files[0];
    if (!file) {
      alert('Please select a video file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const videoTitle = prompt('Enter the title for your video:');
      if (!videoTitle) {
        alert('Video title cannot be empty!');
        return;
      }

      const currentUser = localStorage.getItem('currentUser') || 'Unknown User';

      const videoData = {
        src: e.target.result,
        title: videoTitle,
        uploader: currentUser,
      };

      saveVideoToStorage(videoData);
      renderVideo(videoData);
    };
    reader.readAsDataURL(file);
  };

  videoFile.click();
}

// Function to save the video data to localStorage
function saveVideoToStorage(videoData) {
  const videos = JSON.parse(localStorage.getItem('videos')) || [];
  videos.push(videoData);
  localStorage.setItem('videos', JSON.stringify(videos));
}

// Function to render a video on the page
function renderVideo(videoData) {
  // Check if the videoData contains the expected properties
  if (!videoData || !videoData.src || !videoData.title || !videoData.uploader) {
    console.error('Invalid video data:', videoData);
    return; // Exit if video data is invalid
  }

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-entry';

  const videoElement = document.createElement('video');
  videoElement.src = videoData.src;
  videoElement.controls = true;

  const titleBox = document.createElement('div');
  titleBox.className = 'video-title';
  titleBox.innerText = videoData.title;

  const uploaderBox = document.createElement('div');
  uploaderBox.className = 'video-uploader';
  uploaderBox.innerText = `Uploaded by ${videoData.uploader}`;
  uploaderBox.style.color = 'red'; // Set the uploader text color to red

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete Video';
  deleteButton.onclick = function() {
    if (videoData.uploader === localStorage.getItem('currentUser')) {
      deleteVideo(videoData);
    } else {
      alert('You can only delete your own videos.');
    }
  };

  videoContainer.appendChild(videoElement);
  videoContainer.appendChild(titleBox);
  videoContainer.appendChild(uploaderBox);
  videoContainer.appendChild(deleteButton); // Add the delete button to the video container

  document.getElementById('videosContainer').appendChild(videoContainer);
}

// Function to delete a video
function deleteVideo(videoData) {
  // Get the current videos from localStorage
  let videos = JSON.parse(localStorage.getItem('videos')) || [];

  // Filter out the video to be deleted
  videos = videos.filter(video => video.src !== videoData.src);

  // Save the updated videos array back to localStorage
  localStorage.setItem('videos', JSON.stringify(videos));

  // Reload the videos on the page to reflect the changes
  document.getElementById('videosContainer').innerHTML = ''; // Clear current videos
  loadVideos(); // Load videos again to display updated list

  alert('Video deleted successfully!');
}

// Function to load videos from localStorage on page load
function loadVideos() {
  const videos = JSON.parse(localStorage.getItem('videos')) || [];
  videos.forEach(renderVideo);
}

// Load videos when the page loads
window.onload = function () {
  loadVideos();

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    document.getElementById('welcomeMessage').innerText = `Hello, ${currentUser}!`;
    toggleLoggedInState(true);
  }
};
