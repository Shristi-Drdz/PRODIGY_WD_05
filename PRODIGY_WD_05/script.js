const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const initialImage = document.querySelector('.initial-image');
const weatherImage = document.querySelector('.weather-image');

search.addEventListener('click', () => {
    const APIKey = '518bdc9e6af61c5a21bfa25404277502';
    const city = document.querySelector(".search-box input").value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '401') { 
                alert('Invalid API key');
                return;
            }
            if (json.cod === '404') { 
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherImage.src = 'images/sun.png';
                    break;
                case 'Rain':
                    weatherImage.src = 'images/rain.png';
                    break;
                case 'Snow':
                    weatherImage.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    weatherImage.src = 'images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    weatherImage.src = 'images/mist.png';
                    break;
                default:
                    weatherImage.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            initialImage.style.display = 'none';
            weatherImage.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to retrieve weather data');
        });
});

window.addEventListener('load', () => {
    weatherBox.style.visibility = 'visible';
    initialImage.style.display = 'block';
    weatherImage.style.display = 'none';
});