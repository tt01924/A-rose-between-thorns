const bushes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const roses = document.querySelectorAll('.rose');
const thorns = document.querySelectorAll('.thorn');

const gameOverText = document.querySelector('.finalScore');

let lastHole;
let shouldTheGameEnd = false;
let score = 0;
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Ah nah thats the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function thornOrRose() {
    const options = ["thorn", "rose"]
    const idx = Math.floor(Math.random() * options.length);
    return options[idx]
}

function peep() {
    const time = randomTime(400, 1000);
    const bush = randomHole(bushes);
    const alternateUp = thornOrRose()
    const newClass = `up-${alternateUp}`;
    bush.classList.add(newClass);
    setTimeout(() => {
        bush.classList.remove(newClass);
        if (!shouldTheGameEnd) peep();
    }, time);
}
function startGame() {
    scoreBoard.textContent = 0;
    shouldTheGameEnd = false;
    score = 0;
    peep();
    setTimeout(() => shouldTheGameEnd = true, 10000)
}
function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up-rose');
    scoreBoard.textContent = score;
}
roses.forEach(rose => rose.addEventListener('click', bonk));
thorns.forEach(thorn => thorn.addEventListener('click', gameOver));

function gameOver() {
// Ends game and keeps the score; end game means stop the timer (no more items appear) //
    shouldTheGameEnd = true
    gameOverText.classList.add("show");
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the instructions popup and the button to show instructions
    var instructionsPopup = document.getElementById("instructionsPopup");
    var showInstructionsBtn = document.getElementById("showInstructions");
    
    // Get the close button inside the instructions popup
    var closeInstructionsBtn = document.getElementById("closeInstructions");
    
    // When the user clicks on the button, show the instructions popup
    showInstructionsBtn.addEventListener("click", function() {
        instructionsPopup.style.display = "block";
    });
    
    // When the user clicks on the close button, hide the instructions popup
    closeInstructionsBtn.addEventListener("click", function() {
        instructionsPopup.style.display = "none";
    });
    
    // When the user clicks anywhere outside of the instructions popup, close it
    window.addEventListener("click", function(event) {
        if (event.target == instructionsPopup) {
            instructionsPopup.style.display = "none";
        }
    });
});
// Function to open leaderboard popup
document.getElementById("openLeaderboard").addEventListener("click", function() {
    document.getElementById("leaderboardPopup").style.display = "block";
    fetchLeaderboardData(); // Fetch leaderboard data when popup is opened
});

// Function to close leaderboard popup
document.getElementById("closeLeaderboard").addEventListener("click", function() {
    document.getElementById("leaderboardPopup").style.display = "none";
});

// Function to fetch leaderboard data from backend
function fetchLeaderboardData() {
    // Fetch leaderboard data from your backend server using AJAX or Fetch API
    // Example:
    /*
    fetch('/leaderboard')
        .then(response => response.json())
        .then(data => {
            // Display leaderboard data in the popup container
            displayLeaderboardData(data);
        })
        .catch(error => console.error('Error fetching leaderboard data:', error));
    */
}

// Function to display leaderboard data in the popup container
function displayLeaderboardData(data) {
    // Example:
    /*
    const leaderboardContent = document.getElementById('leaderboardContent');
    leaderboardContent.innerHTML = ''; // Clear previous content
    data.forEach((entry, index) => {
        const row = document.createElement('div');
        row.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
        leaderboardContent.appendChild(row);
    });
    */
}
// function finalScore() {
//   if (shouldTheGameEnd) {

// };
// }