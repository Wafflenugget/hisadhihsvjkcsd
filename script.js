// Get references to elements
const signOutBtn = document.getElementById('sign-out-btn');
const addVideoBtn = document.getElementById('add-video-btn');
const addVideoModal = document.getElementById('add-video-modal');
const confirmAddBtn = document.getElementById('confirm-add-btn');
const exitAddBtn = document.getElementById('exit-add-btn');

// Sign out functionality
signOutBtn.addEventListener('click', () => {
    window.location.href = "https://codepen.io/KIDS-LEARNING-FOR-EVRYONE/pen/KwPVaQg";
});

// Open the "Add Video" modal
addVideoBtn.addEventListener('click', () => {
    addVideoModal.style.display = 'block';
});

// Close the modal when "Exit" is clicked
exitAddBtn.addEventListener('click', () => {
    addVideoModal
