const select = document.getElementById('locationSelect');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const resultBox = document.getElementById('resultBox');
const errorBox = document.getElementById('errorBox');

select.addEventListener('change', async function () {
  const value = this.value;
  if (!value) return;

  const [lat, lng] = value.split(',');
  const url = `https://sunrisesunset.io/api?lat=${lat}&lng=${lng}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK') {
      sunriseEl.textContent = data.results.sunrise;
      sunsetEl.textContent = data.results.sunset;
      resultBox.classList.remove('hidden');
      errorBox.classList.add('hidden');
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (err) {
    errorBox.textContent = 'Failed to fetch sunrise/sunset data. Please try again.';
    errorBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
  }
});
