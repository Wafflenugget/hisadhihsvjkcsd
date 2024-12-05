// Get references to elements
const signOutBtn = document.getElementById('sign-out-btn');
const addVideoBtn = document.getElementById('add-video-btn');
const addVideoModal = document.getElementById('add-video-modal');
const confirmAddBtn = document.getElementById('confirm-add-btn');
const exitAddBtn = document.getElementById('exit-add-btn');

// Sign out functionality
signOutBtn.addEventListener('click', () => {
    window.location.href = "register.html"; // Redirect to registration page
});

// Open the "Add Video" modal
addVideoBtn.addEventListener('click', () => {
    addVideoModal.style.display = 'block';
});

// Close the modal when "Exit" is clicked
exitAddBtn.addEventListener('click', () => {
    addVideoModal.style.display = 'none';
});

// Confirm adding video
confirmAddBtn.addEventListener('click', () => {
    const videoFile = document.getElementById('video-file').files[0];
    if (videoFile) {
        alert(`Video "${videoFile.name}" added successfully!`);
        addVideoModal.style.display = 'none';
    } else {
        alert('Please select a video file to add.');
    }
});
