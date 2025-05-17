const api = "http://api.weatherapi.com/v1/current.json?key=a22e7d2de0654c8ea3c101954251705&q=Japan";


async function renderWeather(){
  try{
    const response = await fetch(api);
    const data = await response.json();

    return console.log(data);
  } catch(err){
    console.log(`Something went wrong: ${err}`);
  }
}

runWeather();