const locationSelect = document.getElementById('locationSelect');
const dashboard = document.getElementById('dashboard');
const errorBox = document.getElementById('errorBox');

async function fetchData(date, lat, lng) {
  const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${date}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK') throw new Error(data.status);
  return data.results;
}

function createCard(title, data) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p><strong>Sunrise:</strong> ${data.sunrise}</p>
      <p><strong>Sunset:</strong> ${data.sunset}</p>
      <p><strong>Dawn:</strong> ${data.dawn}</p>
      <p><strong>Dusk:</strong> ${data.dusk}</p>
      <p><strong>Day Length:</strong> ${data.day_length}</p>
      <p><strong>Solar Noon:</strong> ${data.solar_noon}</p>
      <p><strong>Timezone:</strong> ${data.timezone}</p>
    </div>
  `;
}

locationSelect.addEventListener('change', async () => {
  const value = locationSelect.value;
  if (!value) return;

  dashboard.innerHTML = `<div class="placeholder">Loading data...</div>`;
  errorBox.classList.add('hidden');

  const [lat, lng] = value.split(',');
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  try {
    const todayData = await fetchData(today, lat, lng);
    const tomorrowData = await fetchData(tomorrow, lat, lng);

    dashboard.innerHTML = `
      ${createCard("Today", todayData)}
      ${createCard("Tomorrow", tomorrowData)}
    `;
  } catch (err) {
    errorBox.textContent = `Error fetching data: ${err.message}`;
    errorBox.classList.remove('hidden');
    dashboard.innerHTML = `<div class="placeholder">No data to display</div>`;
  }
});
