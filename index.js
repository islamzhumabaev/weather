const container = document.querySelector('.container');
const searchBox = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details'); 
const error404 = document.querySelector('.not-found'); 

searchBox.addEventListener('click', () => {
    const APIKey = 'afeee8a1433524e23dadb3680163e789';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/free-icon-sun-4814268.png'; 
                    break;

                case 'Rain':
                    image.src = 'img/free-icon-rain-704832.png'; 
                    break;

                case 'Snow':
                    image.src = 'img/free-icon-snow-1409310.png';
                    break;

                case 'Clouds':
                    image.src = 'img/free-icon-clouds-704845.png';
                    break;

                case 'Haze':
                    image.src = 'img/free-icon-fog-5243833.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = 'block'; 
            weatherDetails.style.display = 'block'; 
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '550px';
        })
        .catch(error => {
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            container.style.height = '400px';
            image.src = null;
            console.error(error.message);
        });
});
