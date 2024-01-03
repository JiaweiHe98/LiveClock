let fontSize = parseFloat(localStorage.getItem('fontSize')) || 2; // Initial font size from localStorage
let darkMode = localStorage.getItem('darkMode') === 'true' || false; // Initial dark mode state from localStorage
let is24HourFormat = localStorage.getItem('is24HourFormat') === 'true' || false; // Initial time format from localStorage

function updateClock() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (!is24HourFormat) {
        // Convert to 12-hour format
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    }

    const clockText = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = clockText;
    document.getElementById('clock').style.fontSize = fontSize + 'em';
}

function increaseFontSize() {
    fontSize += 0.5;
    updateClock();
    saveSettings();
}

function decreaseFontSize() {
    if (fontSize > 0.5) {
        fontSize -= 0.5;
        updateClock();
        saveSettings();
    }
}

function toggleDarkMode() {
    darkMode = !darkMode;
    updateDarkMode();
    saveSettings();
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    updateClock();
    saveSettings();
}

function updateDarkMode() {
    const body = document.body;
    body.style.backgroundColor = darkMode ? '#333' : '#f0f0f0';
    document.getElementById('clock').style.color = darkMode ? '#fff' : '#333';
}

function saveSettings() {
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('is24HourFormat', is24HourFormat);
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();
updateDarkMode(); // Ensure dark mode is initialized
