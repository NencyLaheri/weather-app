import './App.css';
// import weatherImage from './Images/weather.jpg'
import weatherImage from './Images/www.gif'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiSunCloudyLine } from 'react-icons/ri'
import Sidebar from './components/Sidebar';
import axios from 'axios';
import React, { useState,useEffect } from 'react'


function App() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('surat');
  let current=new Date();
  let dd=`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  console.log("dateeeeeeeeeeeee",dd);
  let day = current.toLocaleDateString('en-US', { weekday: 'long' });
  console.log("dayyyyyyyyyyy",day);
  const [cDate, setDate] = useState(dd);
  const [cDay, setDay] = useState(day);
  const [Precipitation, setPrecipitation] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dtl={
    cloudy:'',
    humidity:'',
    wind:'',
    hData:[],
  };
  const [Details, setDetails] = useState(dtl);
  const [inputValue, setInputValue] = useState(city);
  const [icon, seticon] = useState();


  useEffect(() => {
    weatherApi();
    
  }, [city]);

  const daysdata = [
 
      {
        "weather": "Sunny",
        "img": require("./assets/weatherIcons/day/113.png")
      },
      {
        "weather": "Partly cloudy",
        "img": require("./assets/weatherIcons/day/116.png")
      },
      {
        "weather": "Cloudy",
        "img": require("./assets/weatherIcons/day/119.png")
      },
      {
        "weather": "Overcast",
        "img": require("./assets/weatherIcons/day/122.png")
      },
      {
        "weather": "Mist",
        "img": require("./assets/weatherIcons/day/143.png")
      },
      {
        "weather": "Patchy rain possible",
        "img": require("./assets/weatherIcons/day/176.png")
      },
      {
        "weather": "Patchy snow possible",
        "img": require("./assets/weatherIcons/day/179.png")
      },
      {
        "weather": "Patchy sleet possible",
        "img": require("./assets/weatherIcons/day/182.png")
      },
      {
        "weather": "Patchy freezing drizzle possible",
        "img": require("./assets/weatherIcons/day/185.png")
      },
      {
        "weather": "Thundery outbreaks possible",
        "img": require("./assets/weatherIcons/day/200.png")
      },
      {
        "weather": "Blowing snow",
        "img": require("./assets/weatherIcons/day/227.png")
      },
      {
        "weather": "Blizzard",
        "img": require("./assets/weatherIcons/day/230.png")
      },
      {
        "weather": "Fog",
        "img": require("./assets/weatherIcons/day/248.png")
      },
      {
        "weather": "Freezing fog",
        "img": require("./assets/weatherIcons/day/260.png")
      },
      {
        "weather": "Patchy light drizzle",
        "img": require("./assets/weatherIcons/day/263.png")
      },
      {
        "weather": "Light drizzle",
        "img": require("./assets/weatherIcons/day/266.png")
      },
      {
        "weather": "Freezing drizzle",
        "img": require("./assets/weatherIcons/day/281.png")
      },
      {
        "weather": "Heavy freezing drizzle",
        "img": require("./assets/weatherIcons/day/284.png")
      },
      {
        "weather": "Patchy light rain",
        "img": require("./assets/weatherIcons/day/293.png")
      },
      {
        "weather": "Light rain",
        "img": require("./assets/weatherIcons/day/296.png")
      },
      {
        "weather": "Moderate rain at times",
        "img": require("./assets/weatherIcons/day/299.png")
      },
      {
        "weather": "Moderate rain",
        "img": require("./assets/weatherIcons/day/302.png")
      },
      {
        "weather": "Heavy rain at times",
        "img": require("./assets/weatherIcons/day/305.png")
      },
      {
        "weather": "Heavy rain",
        "img": require("./assets/weatherIcons/day/308.png")
      },
      {
        "weather": "Light freezing rain",
        "img": require("./assets/weatherIcons/day/311.png")
      },
      {
        "weather": "Moderate or heavy freezing rain",
        "img": require("./assets/weatherIcons/day/314.png")
      },
      {
        "weather": "Light sleet",
        "img": require("./assets/weatherIcons/day/317.png")
      },
      {
        "weather": "Moderate or heavy sleet",
        "img": require("./assets/weatherIcons/day/320.png")
      },
      {
        "weather": "Patchy light snow",
        "img": require("./assets/weatherIcons/day/323.png")
      },
      {
        "weather": "Light snow",
        "img": require("./assets/weatherIcons/day/326.png")
      },
      {
        "weather": "Patchy moderate snow",
        "img": require("./assets/weatherIcons/day/329.png")
      },
      {
        "weather": "Moderate snow",
        "img": require("./assets/weatherIcons/day/332.png")
      },
      {
        "weather": "Patchy heavy snow",
        "img": require("./assets/weatherIcons/day/335.png")
      },
      {
        "weather": "Heavy snow",
        "img": require("./assets/weatherIcons/day/338.png")
      },
      {
        "weather": "Ice pellets",
        "img": require("./assets/weatherIcons/day/350.png")
      },
      {
        "weather": "Light rain shower",
        "img": require("./assets/weatherIcons/day/353.png")
      },
      {
        "weather": "Moderate or heavy rain shower",
        "img": require("./assets/weatherIcons/day/356.png")
      },
      {
        "weather": "Torrential rain shower",
        "img": require("./assets/weatherIcons/day/359.png")
      },
      {
        "weather": "Light sleet showers",
        "img": require("./assets/weatherIcons/day/362.png")
      },
      {
        "weather": "Moderate or heavy sleet showers",
        "img": require("./assets/weatherIcons/day/365.png")
      },
      {
        "weather": "Light snow showers",
        "img": require("./assets/weatherIcons/day/368.png")
      },
      {
        "weather": "Moderate or heavy snow showers",
        "img": require("./assets/weatherIcons/day/371.png")
      },
      {
        "weather": "Light showers of ice pellets",
        "img": require("./assets/weatherIcons/day/374.png")
      },
      {
        "weather": "Moderate or heavy showers of ice pellets",
        "img": require("./assets/weatherIcons/day/377.png")
      },
      {
        "weather": "Patchy light rain with thunder",
        "img": require("./assets/weatherIcons/day/386.png")
      },
      {
        "weather": "Moderate or heavy rain with thunder",
        "img": require("./assets/weatherIcons/day/389.png")
      },
      {
        "weather": "Patchy light snow with thunder",
        "img": require("./assets/weatherIcons/day/392.png")
      },
      {
        "weather": "Moderate or heavy snow with thunder",
        "img": require("./assets/weatherIcons/day/395.png")
      },
      {
        weather: "Clear",
        img: require("./assets/weatherIcons/night/113.png"),
      },
      {
        weather: "Partly cloudy",
        img: require("./assets/weatherIcons/night/116.png"),
      },
      {
        weather: "Cloudy",
        img: require("./assets/weatherIcons/night/119.png"),
      },
      {
        weather: "Overcast",
        img: require("./assets/weatherIcons/night/122.png"),
      },
      {
        weather: "Mist",
        img: require("./assets/weatherIcons/night/143.png"),
      },
      {
        weather: "Patchy rain possible",
        img: require("./assets/weatherIcons/night/176.png"),
      },
      {
        weather: "Patchy snow possible",
        img: require("./assets/weatherIcons/night/179.png"),
      },
      {
        weather: "Patchy sleet possible",
        img: require("./assets/weatherIcons/night/182.png"),
      },
      {
        weather: "Patchy freezing drizzle possible",
        img: require("./assets/weatherIcons/night/185.png"),
      },
      {
        weather: "Thundery outbreaks possible",
        img: require("./assets/weatherIcons/night/200.png"),
      },
      {
        weather: "Blowing snow",
        img: require("./assets/weatherIcons/night/227.png"),
      },
      {
        weather: "Blizzard",
        img: require("./assets/weatherIcons/night/230.png"),
      },
      {
        weather: "Fog",
        img: require("./assets/weatherIcons/night/248.png"),
      },
      {
        weather: "Freezing fog",
        img: require("./assets/weatherIcons/night/260.png"),
      },
      {
        weather: "Patchy light drizzle",
        img: require("./assets/weatherIcons/night/263.png"),
      },
      {
        weather: "Light drizzle",
        img: require("./assets/weatherIcons/night/266.png"),
      },
      {
        weather: "Freezing drizzle",
        img: require("./assets/weatherIcons/night/281.png"),
      },
      {
        weather: "Heavy freezing drizzle",
        img: require("./assets/weatherIcons/night/284.png"),
      },
      {
        weather: "Patchy light rain",
        img: require("./assets/weatherIcons/night/293.png"),
      },
      {
        weather: "Light rain",
        img: require("./assets/weatherIcons/night/296.png"),
      },
      {
        weather: "Moderate rain at times",
        img: require("./assets/weatherIcons/night/299.png"),
      },
      {
        weather: "Moderate rain",
        img: require("./assets/weatherIcons/night/302.png"),
      },
      {
        weather: "Heavy rain at times",
        img: require("./assets/weatherIcons/night/305.png"),
      },
      {
        weather: "Heavy rain",
        img: require("./assets/weatherIcons/night/308.png"),
      },
      {
        weather: "Light freezing rain",
        img: require("./assets/weatherIcons/night/311.png"),
      },
      {
        weather: "Moderate or heavy freezing rain",
        img: require("./assets/weatherIcons/night/314.png"),
      },
      {
        weather: "Light sleet",
        img: require("./assets/weatherIcons/night/317.png"),
      },
      {
        weather: "Moderate or heavy sleet",
        img: require("./assets/weatherIcons/night/320.png"),
      },
      {
        weather: "Patchy light snow",
        img: require("./assets/weatherIcons/night/323.png"),
      },
      {
        weather: "Light snow",
        img: require("./assets/weatherIcons/night/326.png"),
      },
      {
        weather: "Patchy moderate snow",
        img: require("./assets/weatherIcons/night/329.png"),
      },
      {
        weather: "Moderate snow",
        img: require("./assets/weatherIcons/night/332.png"),
      },
      {
        weather: "Patchy heavy snow",
        img: require("./assets/weatherIcons/night/335.png"),
      },
      {
        weather: "Heavy snow",
        img: require("./assets/weatherIcons/night/338.png"),
      },
      {
        weather: "Ice pellets",
        img: require("./assets/weatherIcons/night/350.png"),
      },
      {
        weather: "Light rain shower",
        img: require("./assets/weatherIcons/night/353.png"),
      },
      {
        weather: "Moderate or heavy rain shower",
        img: require("./assets/weatherIcons/night/356.png"),
      },
      {
        weather: "Torrential rain shower",
        img: require("./assets/weatherIcons/night/359.png"),
      },
      {
        weather: "Light sleet showers",
        img: require("./assets/weatherIcons/night/362.png"),
      },
      {
        weather: "Moderate or heavy sleet showers",
        img: require("./assets/weatherIcons/night/365.png"),
      },
      {
        weather: "Light snow showers",
        img: require("./assets/weatherIcons/night/368.png"),
      },
      {
        weather: "Moderate or heavy snow showers",
        img: require("./assets/weatherIcons/night/371.png"),
      },
      {
        weather: "Light showers of ice pellets",
        img: require("./assets/weatherIcons/night/374.png"),
      },
      {
        weather: "Moderate or heavy showers of ice pellets",
        img: require("./assets/weatherIcons/night/377.png"),
      },
      {
        weather: "Patchy light rain with thunder",
        img: require("./assets/weatherIcons/night/386.png"),
      },
      {
        weather: "Moderate or heavy rain with thunder",
        img: require("./assets/weatherIcons/night/389.png"),
      },
      {
        weather: "Patchy light snow with thunder",
        img: require("./assets/weatherIcons/night/392.png"),
      },
      {
        weather: "Moderate or heavy snow with thunder",
        img: require("./assets/weatherIcons/night/395.png"),
      },
  ]
  

  const weatherApi=async()=>
  {
    try {
      const apiKey = 'd6c135f0980146ddac955040230307'; 
      const location = inputValue 

      
    
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=d6c135f0980146ddac955040230307&q=${location}&days=5`
      ).catch(function (error) {
        if (error.response) {
          console.log(error.response.data.error.code);
          alert("No matching location found")
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
       
      });
      console.log("--------",response);

     
      const weatherData = await response.data;
    
      console.log("dataaaaaaaaaaaaaaaaaaaaaa------->>",weatherData);
      console.log("Weather Data--->>>>>>>>",weatherData.current.condition.text);
      const precipitation=weatherData.current.condition.text;
      setPrecipitation(precipitation);
      const f=weatherData.current.temp_c.toFixed(0);
      console.log("Temparature->>>>>.",f)
      setForecast(f);
      const dt=weatherData.current.cloud;
      const hm=weatherData.current.humidity;
      const wd=weatherData.current.wind_kph;
      console.log("Cloudy------>>>>",dt);
      console.log("Humidity------>>>>",hm);
      console.log("Wind------>>>>",wd);
      setDetails(dtl=> ({cloudy:dt,humidity:hm,wind:wd}));
      console.log("detailssssssss",Details.cloudy);
      setCity(weatherData.location.name);
      console.log(">>>>>>>>>>>...",weatherData.current.condition.text)
      const HourlyData=weatherData.forecast.forecastday[0].hour;
      setDetails(dtl=>({hData:HourlyData}))
      console.log("hourly dataaa->>>>>>>>..",Details.hData);
      const t=weatherData.current.condition.text;
      // console.log("weather iconnnnnnnn",daysdata.day);
      daysdata.day.map((item)=>
      {
        // console.log("itemmmmmmmm",item);
        if(item.weather==t)
        {
          console.log("matchedddddddddddddd----------",t);
          seticon(item.img);
        }
      })
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  const toggleSidebar = () => {
      if(!isSidebarOpen){
        setIsSidebarOpen(true)  
      }
      else{
        setIsSidebarOpen(false)
      }
    console.log("first--------------->",isSidebarOpen)
  };
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${weatherImage})` }} >
      <div className="flex flex-col justify-between h-screen py-10">
        <div className="flex justify-between mx-12 ">
          <div><h1 className="tracking-widest cursor-pointer text-black">The Weather</h1></div>
          
          <div className="text-3xl text-white cursor-pointer" >
            <RxHamburgerMenu  onClick={toggleSidebar} />
          </div>
          
          {isSidebarOpen && <Sidebar setInputValue={setInputValue} inputValue={inputValue} Details={Details} weatherApi={weatherApi} setPrecipitation={setPrecipitation} city={city} setCity={setCity} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} forecast={forecast} setForecast={setForecast}/>}
          </div>
     
     
        <div className="flex justify-center">
          <div className="flex space-x-6 ">
            <div className='flex'>
              <p className="text-8xl">{forecast}&deg;</p>
              {/* <p className="text-8xl">30&deg;</p> */}
              
            </div>
            <div className="flex flex-col justify-center ">
            <p className='text-5xl'>{city.toUpperCase()}</p>
            {/* <p className='text-5xl'>London</p> */}
            <p>{cDate+' '+cDay}</p>
            </div>
            <div className='flex flex-col justify-center'>
              {/* <span className=''><RiSunCloudyLine className='text-5xl'/></span> */}
              <span><img src={icon} alt="" /></span>
              <p>{Precipitation}</p>
              {/* <p>Cloudy</p> */}
            </div>
            
          </div>
        </div> 

        <div className="flex justify-around text-white mx-28 mb-28">
          {
            Details.hData.map((item,index)=>
            {
              console.log("---->>>>>----",item.temp_c);
              let getindex=daysdata.findIndex(response=>response.weather==item.condition.text);
              console.log("getindexxxxxxxxxxxxxx",getindex);
              return(
                <div className="flex flex-col">
                  <div>{item.temp_c}</div>
                  <div>{item.condition.text}</div>
                  <img src={daysdata[getindex].img} alt="" />
                </div>
              )
            })
          }  
        </div>

      </div>
    </div>
  );
}

export default App;
