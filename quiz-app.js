
let selectedState = null;
let filteredSites = [];
let currentSite = null;
let map = L.map('map').setView([-25.2744, 133.7751], 4);
let marker = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const stateSelect = document.getElementById('stateSelect');
const guessSelect = document.getElementById('guessSelect');
const feedback = document.getElementById('feedback');

function populateStates() {
  const states = [...new Set(siteData.map(site => site['Site State']))].sort();
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.text = state;
    stateSelect.appendChild(option);
  });
}

function populateGuesses() {
  guessSelect.innerHTML = '<option value="">Select the site name</option>';
  filteredSites.forEach(site => {
    const option = document.createElement('option');
    option.value = site.Site;
    option.text = site.Site;
    guessSelect.appendChild(option);
  });
}

function startQuiz() {
  selectedState = stateSelect.value;
  if (!selectedState) {
    alert('Please select a state.');
    return;
  }
  filteredSites = siteData.filter(site => site['Site State'] === selectedState);
  populateGuesses();

  currentSite = filteredSites[Math.floor(Math.random() * filteredSites.length)];
  if (marker) map.removeLayer(marker);
  marker = L.marker([currentSite.Latitude, currentSite.Longitude]).addTo(map);
  map.setView([currentSite.Latitude, currentSite.Longitude], 7);

  feedback.innerText = '';
}

guessSelect.addEventListener('change', () => {
  if (!currentSite) return;
  if (guessSelect.value === currentSite.Site) {
    feedback.innerText = '✅ Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.innerText = `❌ Incorrect. It was ${currentSite.Site}`;
    feedback.style.color = 'red';
  }
});

populateStates();
