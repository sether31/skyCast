// api
const apiKey = "a22e7d2de0654c8ea3c101954251705";
// search bar
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
// data
const displayDate = document.querySelector('#date');
const conditionIcon = document.querySelector('#condition-icon');
const place = document.querySelector('#place');
const degrees = document.querySelector('#degrees');
const conditionText = document.querySelector('#condition-text')
const greet = document.querySelector('#greet');
const feelsLike = document.querySelector('#feels-like');
const wind = document.querySelector('#wind');
const sunset = document.querySelector('#sunset');
// errors and loading
const message = document.querySelector('#message');
const loading = document.querySelector('#loading');

// render weather when search was submit
searchBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  if(search.value.length > 0){
    let api = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${search.value}`;
    renderWeather(api);
  }
});


async function renderWeather(
  api = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Tokyo`){
  try{
    search.value = '';
    message.textContent = '';
    const response = await fetch(api);

    if(!response.ok){
      throw new Error(`API error: ${response.status}`);
    } 

    const data = await response.json();

    // delay
    showLoadingScreen();
    await wait(3000);

    // place
    place.textContent =  `${data.location.name}, ${data.location.country}`;

    // date and time
    const date = new Date(data.location.localtime);
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const day = date.toLocaleDateString('en-US', {
      weekday: 'long'
    });
    const formatted = `${day.toUpperCase()}, ${time.toUpperCase()}`;
    displayDate.textContent = `${formatted}`;


    // weather condition
    conditionIcon.src = data.current.condition.icon.replace("64x64", "128x128");
    const greetings = data.current.is_day ? "Good Day" : "Good Night";
    greet.textContent = greetings;
    const bgDisplay = data.current.is_day ? "bg_day_pic" : "bg_night_pic";

    if(data.current.is_day){
      document.querySelector('body').classList.remove('bg_night_pic');
      document.querySelector('body').classList.add(bgDisplay);
    } else{
      document.querySelector('body').classList.remove('bg_day_pic');
      document.querySelector('body').classList.add(bgDisplay);
    }
    
    
    degrees.textContent =  `${data.current.temp_c}°c`;
    conditionText.textContent = data.current.condition.text;
    feelsLike.textContent = `${data.current.feelslike_c}°C`;
    wind.textContent = `${data.current.wind_kph}kph`;
    sunset.textContent = data.forecast.forecastday[0].astro.sunset;

    hideLoadingScreen();
    return console.log(data);
  } catch(err){
    console.log(`Something went wrong: ${err}`);
    errMessage('Invalid location. Please try again');
  }
}

renderWeather();


function errMessage(msg){
  if(message){
    message.textContent = msg;
  } else{
    alert(msg);
  }
}

function showLoadingScreen(){
  loading.classList.remove('hidden');
}

function hideLoadingScreen(){
  loading.classList.add('hidden');
}

function wait(ms){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    }, ms)
  })
}