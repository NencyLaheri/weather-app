import './App.css';
import weatherImage from './Images/cloudy.gif'
import weatherImage1 from './Images/sunny.gif'
import weatherImage2 from './Images/Rainy.webp'
import weatherImage3 from './Images/clear.webp'
import weatherImage4 from './Images/snow.gif'
import weatherImage5 from './Images/other.jpg'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiSunCloudyLine } from 'react-icons/ri'
import Sidebar from './components/Sidebar';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';



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
  // const path = require('path');
  const dtl={
    cloudy:'',
    humidity:'',
    wind:'',
    hData:[],
    nextDData:[],
  };
  const [Details, setDetails] = useState(dtl);
  const [inputValue, setInputValue] = useState(city);
  const [icon, seticon] = useState();
  const backImage=[
    {
      w:'Cloudy',
      imageB:weatherImage
    },
    {
      w:'cloudy',
      imageB:weatherImage
    },
    {
      w:'Sunny',
      imageB:weatherImage1
    },
    {
      w:'rain',
      imageB:weatherImage2
    },
    {
      w:'clear',
      imageB:weatherImage3
    },
    {
      w:'snow',
      imageB:weatherImage4
    },
    {
      w:'other',
      imageB:weatherImage5
    }
  ]

  const [bImage, setbImage] = useState('');
  const [ctime, setcTime] = useState('day');

  
  useEffect(() => {
    weatherApi();
    
  }, [city]);

  // const daysdata = [
 
  //     {
  //       "weather": "Sunny",
  //       "img": require("./assets/weatherIcons/day/113.png")
  //     },
  //     {
  //       "weather": "Partly cloudy",
  //       "img": require("./assets/weatherIcons/day/116.png")
  //     },
  //     {
  //       "weather": "Cloudy",
  //       "img": require("./assets/weatherIcons/day/119.png")
  //     },
  //     {
  //       "weather": "Overcast",
  //       "img": require("./assets/weatherIcons/day/122.png")
  //     },
  //     {
  //       "weather": "Mist",
  //       "img": require("./assets/weatherIcons/day/143.png")
  //     },
  //     {
  //       "weather": "Patchy rain possible",
  //       "img": require("./assets/weatherIcons/day/176.png")
  //     },
  //     {
  //       "weather": "Patchy snow possible",
  //       "img": require("./assets/weatherIcons/day/179.png")
  //     },
  //     {
  //       "weather": "Patchy sleet possible",
  //       "img": require("./assets/weatherIcons/day/182.png")
  //     },
  //     {
  //       "weather": "Patchy freezing drizzle possible",
  //       "img": require("./assets/weatherIcons/day/185.png")
  //     },
  //     {
  //       "weather": "Thundery outbreaks possible",
  //       "img": require("./assets/weatherIcons/day/200.png")
  //     },
  //     {
  //       "weather": "Blowing snow",
  //       "img": require("./assets/weatherIcons/day/227.png")
  //     },
  //     {
  //       "weather": "Blizzard",
  //       "img": require("./assets/weatherIcons/day/230.png")
  //     },
  //     {
  //       "weather": "Fog",
  //       "img": require("./assets/weatherIcons/day/248.png")
  //     },
  //     {
  //       "weather": "Freezing fog",
  //       "img": require("./assets/weatherIcons/day/260.png")
  //     },
  //     {
  //       "weather": "Patchy light drizzle",
  //       "img": require("./assets/weatherIcons/day/263.png")
  //     },
  //     {
  //       "weather": "Light drizzle",
  //       "img": require("./assets/weatherIcons/day/266.png")
  //     },
  //     {
  //       "weather": "Freezing drizzle",
  //       "img": require("./assets/weatherIcons/day/281.png")
  //     },
  //     {
  //       "weather": "Heavy freezing drizzle",
  //       "img": require("./assets/weatherIcons/day/284.png")
  //     },
  //     {
  //       "weather": "Patchy light rain",
  //       "img": require("./assets/weatherIcons/day/293.png")
  //     },
  //     {
  //       "weather": "Light rain",
  //       "img": require("./assets/weatherIcons/day/296.png")
  //     },
  //     {
  //       "weather": "Moderate rain at times",
  //       "img": require("./assets/weatherIcons/day/299.png")
  //     },
  //     {
  //       "weather": "Moderate rain",
  //       "img": require("./assets/weatherIcons/day/302.png")
  //     },
  //     {
  //       "weather": "Heavy rain at times",
  //       "img": require("./assets/weatherIcons/day/305.png")
  //     },
  //     {
  //       "weather": "Heavy rain",
  //       "img": require("./assets/weatherIcons/day/308.png")
  //     },
  //     {
  //       "weather": "Light freezing rain",
  //       "img": require("./assets/weatherIcons/day/311.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy freezing rain",
  //       "img": require("./assets/weatherIcons/day/314.png")
  //     },
  //     {
  //       "weather": "Light sleet",
  //       "img": require("./assets/weatherIcons/day/317.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy sleet",
  //       "img": require("./assets/weatherIcons/day/320.png")
  //     },
  //     {
  //       "weather": "Patchy light snow",
  //       "img": require("./assets/weatherIcons/day/323.png")
  //     },
  //     {
  //       "weather": "Light snow",
  //       "img": require("./assets/weatherIcons/day/326.png")
  //     },
  //     {
  //       "weather": "Patchy moderate snow",
  //       "img": require("./assets/weatherIcons/day/329.png")
  //     },
  //     {
  //       "weather": "Moderate snow",
  //       "img": require("./assets/weatherIcons/day/332.png")
  //     },
  //     {
  //       "weather": "Patchy heavy snow",
  //       "img": require("./assets/weatherIcons/day/335.png")
  //     },
  //     {
  //       "weather": "Heavy snow",
  //       "img": require("./assets/weatherIcons/day/338.png")
  //     },
  //     {
  //       "weather": "Ice pellets",
  //       "img": require("./assets/weatherIcons/day/350.png")
  //     },
  //     {
  //       "weather": "Light rain shower",
  //       "img": require("./assets/weatherIcons/day/353.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy rain shower",
  //       "img": require("./assets/weatherIcons/day/356.png")
  //     },
  //     {
  //       "weather": "Torrential rain shower",
  //       "img": require("./assets/weatherIcons/day/359.png")
  //     },
  //     {
  //       "weather": "Light sleet showers",
  //       "img": require("./assets/weatherIcons/day/362.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy sleet showers",
  //       "img": require("./assets/weatherIcons/day/365.png")
  //     },
  //     {
  //       "weather": "Light snow showers",
  //       "img": require("./assets/weatherIcons/day/368.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy snow showers",
  //       "img": require("./assets/weatherIcons/day/371.png")
  //     },
  //     {
  //       "weather": "Light showers of ice pellets",
  //       "img": require("./assets/weatherIcons/day/374.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy showers of ice pellets",
  //       "img": require("./assets/weatherIcons/day/377.png")
  //     },
  //     {
  //       "weather": "Patchy light rain with thunder",
  //       "img": require("./assets/weatherIcons/day/386.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy rain with thunder",
  //       "img": require("./assets/weatherIcons/day/389.png")
  //     },
  //     {
  //       "weather": "Patchy light snow with thunder",
  //       "img": require("./assets/weatherIcons/day/392.png")
  //     },
  //     {
  //       "weather": "Moderate or heavy snow with thunder",
  //       "img": require("./assets/weatherIcons/day/395.png")
  //     },
  //     {
  //       weather: "Clear",
  //       img: require("./assets/weatherIcons/night/113.png"),
  //     },
  //     {
  //       weather: "Partly cloudy",
  //       img: require("./assets/weatherIcons/night/116.png"),
  //     },
  //     {
  //       weather: "Cloudy",
  //       img: require("./assets/weatherIcons/night/119.png"),
  //     },
  //     {
  //       weather: "Overcast",
  //       img: require("./assets/weatherIcons/night/122.png"),
  //     },
  //     {
  //       weather: "Mist",
  //       img: require("./assets/weatherIcons/night/143.png"),
  //     },
  //     {
  //       weather: "Patchy rain possible",
  //       img: require("./assets/weatherIcons/night/176.png"),
  //     },
  //     {
  //       weather: "Patchy snow possible",
  //       img: require("./assets/weatherIcons/night/179.png"),
  //     },
  //     {
  //       weather: "Patchy sleet possible",
  //       img: require("./assets/weatherIcons/night/182.png"),
  //     },
  //     {
  //       weather: "Patchy freezing drizzle possible",
  //       img: require("./assets/weatherIcons/night/185.png"),
  //     },
  //     {
  //       weather: "Thundery outbreaks possible",
  //       img: require("./assets/weatherIcons/night/200.png"),
  //     },
  //     {
  //       weather: "Blowing snow",
  //       img: require("./assets/weatherIcons/night/227.png"),
  //     },
  //     {
  //       weather: "Blizzard",
  //       img: require("./assets/weatherIcons/night/230.png"),
  //     },
  //     {
  //       weather: "Fog",
  //       img: require("./assets/weatherIcons/night/248.png"),
  //     },
  //     {
  //       weather: "Freezing fog",
  //       img: require("./assets/weatherIcons/night/260.png"),
  //     },
  //     {
  //       weather: "Patchy light drizzle",
  //       img: require("./assets/weatherIcons/night/263.png"),
  //     },
  //     {
  //       weather: "Light drizzle",
  //       img: require("./assets/weatherIcons/night/266.png"),
  //     },
  //     {
  //       weather: "Freezing drizzle",
  //       img: require("./assets/weatherIcons/night/281.png"),
  //     },
  //     {
  //       weather: "Heavy freezing drizzle",
  //       img: require("./assets/weatherIcons/night/284.png"),
  //     },
  //     {
  //       weather: "Patchy light rain",
  //       img: require("./assets/weatherIcons/night/293.png"),
  //     },
  //     {
  //       weather: "Light rain",
  //       img: require("./assets/weatherIcons/night/296.png"),
  //     },
  //     {
  //       weather: "Moderate rain at times",
  //       img: require("./assets/weatherIcons/night/299.png"),
  //     },
  //     {
  //       weather: "Moderate rain",
  //       img: require("./assets/weatherIcons/night/302.png"),
  //     },
  //     {
  //       weather: "Heavy rain at times",
  //       img: require("./assets/weatherIcons/night/305.png"),
  //     },
  //     {
  //       weather: "Heavy rain",
  //       img: require("./assets/weatherIcons/night/308.png"),
  //     },
  //     {
  //       weather: "Light freezing rain",
  //       img: require("./assets/weatherIcons/night/311.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy freezing rain",
  //       img: require("./assets/weatherIcons/night/314.png"),
  //     },
  //     {
  //       weather: "Light sleet",
  //       img: require("./assets/weatherIcons/night/317.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy sleet",
  //       img: require("./assets/weatherIcons/night/320.png"),
  //     },
  //     {
  //       weather: "Patchy light snow",
  //       img: require("./assets/weatherIcons/night/323.png"),
  //     },
  //     {
  //       weather: "Light snow",
  //       img: require("./assets/weatherIcons/night/326.png"),
  //     },
  //     {
  //       weather: "Patchy moderate snow",
  //       img: require("./assets/weatherIcons/night/329.png"),
  //     },
  //     {
  //       weather: "Moderate snow",
  //       img: require("./assets/weatherIcons/night/332.png"),
  //     },
  //     {
  //       weather: "Patchy heavy snow",
  //       img: require("./assets/weatherIcons/night/335.png"),
  //     },
  //     {
  //       weather: "Heavy snow",
  //       img: require("./assets/weatherIcons/night/338.png"),
  //     },
  //     {
  //       weather: "Ice pellets",
  //       img: require("./assets/weatherIcons/night/350.png"),
  //     },
  //     {
  //       weather: "Light rain shower",
  //       img: require("./assets/weatherIcons/night/353.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy rain shower",
  //       img: require("./assets/weatherIcons/night/356.png"),
  //     },
  //     {
  //       weather: "Torrential rain shower",
  //       img: require("./assets/weatherIcons/night/359.png"),
  //     },
  //     {
  //       weather: "Light sleet showers",
  //       img: require("./assets/weatherIcons/night/362.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy sleet showers",
  //       img: require("./assets/weatherIcons/night/365.png"),
  //     },
  //     {
  //       weather: "Light snow showers",
  //       img: require("./assets/weatherIcons/night/368.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy snow showers",
  //       img: require("./assets/weatherIcons/night/371.png"),
  //     },
  //     {
  //       weather: "Light showers of ice pellets",
  //       img: require("./assets/weatherIcons/night/374.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy showers of ice pellets",
  //       img: require("./assets/weatherIcons/night/377.png"),
  //     },
  //     {
  //       weather: "Patchy light rain with thunder",
  //       img: require("./assets/weatherIcons/night/386.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy rain with thunder",
  //       img: require("./assets/weatherIcons/night/389.png"),
  //     },
  //     {
  //       weather: "Patchy light snow with thunder",
  //       img: require("./assets/weatherIcons/night/392.png"),
  //     },
  //     {
  //       weather: "Moderate or heavy snow with thunder",
  //       img: require("./assets/weatherIcons/night/395.png"),
  //     },
  // ]

  const daysdata={
    
      day: [
      {
        weather: "Sunny",
        img: require("./assets/weatherIcons/day/113.png"),
      },
      {
        weather: "Partly cloudy",
        img: require("./assets/weatherIcons/day/116.png"),
      },
      {
        weather: "Cloudy",
        img: require("./assets/weatherIcons/day/119.png"),
      },
      {
        weather: "Overcast",
        img: require("./assets/weatherIcons/day/122.png"),
      },
      {
        weather: "Mist",
        img: require("./assets/weatherIcons/day/143.png"),
      },
      {
        weather: "Patchy rain possible",
        img: require("./assets/weatherIcons/day/176.png"),
      },
      {
        weather: "Patchy snow possible",
        img: require("./assets/weatherIcons/day/179.png"),
      },
      {
        weather: "Patchy sleet possible",
        img: require("./assets/weatherIcons/day/182.png"),
      },
      {
        weather: "Patchy freezing drizzle possible",
        img: require("./assets/weatherIcons/day/185.png"),
      },
      {
        weather: "Thundery outbreaks possible",
        img: require("./assets/weatherIcons/day/200.png"),
      },
      {
        weather: "Blowing snow",
        img: require("./assets/weatherIcons/day/227.png"),
      },
      {
        weather: "Blizzard",
        img: require("./assets/weatherIcons/day/230.png"),
      },
      {
        weather: "Fog",
        img: require("./assets/weatherIcons/day/248.png"),
      },
      {
        weather: "Freezing fog",
        img: require("./assets/weatherIcons/day/260.png"),
      },
      {
        weather: "Patchy light drizzle",
        img: require("./assets/weatherIcons/day/263.png"),
      },
      {
        weather: "Light drizzle",
        img: require("./assets/weatherIcons/day/266.png"),
      },
      {
        weather: "Freezing drizzle",
        img: require("./assets/weatherIcons/day/281.png"),
      },
      {
        weather: "Heavy freezing drizzle",
        img: require("./assets/weatherIcons/day/284.png"),
      },
      {
        weather: "Patchy light rain",
        img: require("./assets/weatherIcons/day/293.png"),
      },
      {
        weather: "Light rain",
        img: require("./assets/weatherIcons/day/296.png"),
      },
      {
        weather: "Moderate rain at times",
        img: require("./assets/weatherIcons/day/299.png"),
      },
      {
        weather: "Moderate rain",
        img: require("./assets/weatherIcons/day/302.png"),
      },
      {
        weather: "Heavy rain at times",
        img: require("./assets/weatherIcons/day/305.png"),
      },
      {
        weather: "Heavy rain",
        img: require("./assets/weatherIcons/day/308.png"),
      },
      {
        weather: "Light freezing rain",
        img: require("./assets/weatherIcons/day/311.png"),
      },
      {
        weather: "Moderate or heavy freezing rain",
        img: require("./assets/weatherIcons/day/314.png"),
      },
      {
        weather: "Light sleet",
        img: require("./assets/weatherIcons/day/317.png"),
      },
      {
        weather: "Moderate or heavy sleet",
        img: require("./assets/weatherIcons/day/320.png"),
      },
      {
        weather: "Patchy light snow",
        img: require("./assets/weatherIcons/day/323.png"),
      },
      {
        weather: "Light snow",
        img: require("./assets/weatherIcons/day/326.png"),
      },
      {
        weather: "Patchy moderate snow",
        img: require("./assets/weatherIcons/day/329.png"),
      },
      {
        weather: "Moderate snow",
        img: require("./assets/weatherIcons/day/332.png"),
      },
      {
        weather: "Patchy heavy snow",
        img: require("./assets/weatherIcons/day/335.png"),
      },
      {
        weather: "Heavy snow",
        img: require("./assets/weatherIcons/day/338.png"),
      },
      {
        weather: "Ice pellets",
        img: require("./assets/weatherIcons/day/350.png"),
      },
      {
        weather: "Light rain shower",
        img: require("./assets/weatherIcons/day/353.png"),
      },
      {
        weather: "Moderate or heavy rain shower",
        img: require("./assets/weatherIcons/day/356.png"),
      },
      {
        weather: "Torrential rain shower",
        img: require("./assets/weatherIcons/day/359.png"),
      },
      {
        weather: "Light sleet showers",
        img: require("./assets/weatherIcons/day/362.png"),
      },
      {
        weather: "Moderate or heavy sleet showers",
        img: require("./assets/weatherIcons/day/365.png"),
      },
      {
        weather: "Light snow showers",
        img: require("./assets/weatherIcons/day/368.png"),
      },
      {
        weather: "Moderate or heavy snow showers",
        img: require("./assets/weatherIcons/day/371.png"),
      },
      {
        weather: "Light showers of ice pellets",
        img: require("./assets/weatherIcons/day/374.png"),
      },
      {
        weather: "Moderate or heavy showers of ice pellets",
        img: require("./assets/weatherIcons/day/377.png"),
      },
      {
        weather: "Patchy light rain with thunder",
        img: require("./assets/weatherIcons/day/386.png"),
      },
      {
        weather: "Moderate or heavy rain with thunder",
        img: require("./assets/weatherIcons/day/389.png"),
      },
      {
        weather: "Patchy light snow with thunder",
        img: require("./assets/weatherIcons/day/392.png"),
      },
      {
        weather: "Moderate or heavy snow with thunder",
        img: require("./assets/weatherIcons/day/395.png"),
      }
      ],
      night: [
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
        }
      ],
    
  }
  
  const slideleft=()=>
  {
    let slider=document.getElementById('slider');
    slider.scrollLeft=slider.scrollLeft-500;
  };
  const slideright=()=>
  {
    let slider=document.getElementById('slider');
    slider.scrollLeft=slider.scrollLeft+500;
  };

  const weatherApi=async()=>
  {
    try {
      const apiKey = 'd6c135f0980146ddac955040230307'; 
      const location = inputValue 

      
    
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=d6c135f0980146ddac955040230307&q=${location}&days=6`
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
      
      const bgimagedata=backImage.findIndex(response=>weatherData.current.condition.text.includes(response.w));
      console.log("background image index------",bgimagedata);
      if(bgimagedata!=-1)
      {
        setbImage(backImage[bgimagedata].imageB);
      }
      else
      {
        setbImage(weatherImage5);
      }
      console.log("background imageeeeeeeeeeeeeeeee",bImage);
      const ndd=weatherData.forecast.forecastday;
      console.log("Next 5Daya Data--->>>>>>",ndd);
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
      const HourlyData=weatherData.forecast.forecastday[0].hour;
      setDetails(dtl=> ({cloudy:weatherData.current.cloud ,humidity:hm,wind:wd,hData:HourlyData,nextDData:ndd}));
      console.log("detailssssssss",Details);
      setCity(weatherData.location.name);
      // console.log(">>>>>>>>>>>...",weatherData.current.condition.text)
     
      // setDetails(dtl=>({}))
      // console.log("hourly dataaa->>>>>>>>..",Details.hData);
      const t=weatherData.current.condition.text;
      const t1=weatherData.current.condition.icon;
      
      const lastPart1 = t1.split('/').pop();
      const lastPart2 = t1.split('/').pop();
      console.log("iconnnndataa->>>>>>>",lastPart1)
      // console.log("weather iconnnnnnnn",daysdata.day);
      // const dateCurrent=weatherData.current.last_updated.split(' ')[1];
      const timeCurrent=weatherData.current.last_updated.split(' ')[1].split(':')[0];
      
      if(timeCurrent>=5 || timeCurrent<15)
      {
        console.log('settinggggggggg icon',daysdata.day[0].weather);
      //  seticon(daysdata.day[0].img);
      //  setcTime('day');
       daysdata.day.map((item)=>
       {
         // console.log("itemmmmmmmm",item);
        //  console.log("itemmmmmmmmmmmm---->>>>>>>>>>>mmmmm",item)
        // console.log("dataaaaa->>>>+++++",item.weather);
         if(item.weather==t)
         {
           // const t2=item.img;
           console.log("weatherrrrrrrrrr",item.weather);
           console.log("---------------dayyyyyyyyyyy--------------------------");
          //  console.log("itemmmmmmmmmmm",item.img)
           // const t2 = item.img.match(/"(.*?)"/)[1];
           // console.log("dataaaaaaaaaaaa of imageeeeeeeeeeeeee",t2)
           // console.log("matchedddddddddddddd----------",t);
           seticon(item.img);
           console.log("iconnnnnnnn",icon);
           
         }
       })
      }
      else{
        setcTime('night');
        console.log("elseeeeeeeeeeeeeeeeeeeee")
        daysdata.night.map((item)=>
        {
          // console.log("itemmmmmmmm",item);
          console.log("itemmmmmmmmmmmm---->>>>>>>>>>>mmmmm",item)
          if(item.weather==t)
          {
            // const t2=item.img;
            console.log("weatherrrrrrrrrr",item.weather);
            console.log("----------------nightttt-------------------------");
            console.log("itemmmmmmmmmmm",item.img)
            // const t2 = item.img.match(/"(.*?)"/)[1];
            // console.log("dataaaaaaaaaaaa of imageeeeeeeeeeeeee",t2)
            // console.log("matchedddddddddddddd----------",t);
            seticon(item.img);
            console.log("iconnnnnnnn",icon);
            
          }
        })
      }
      console.log("current time------",timeCurrent)
      console.log("ccccccccccc",ctime);
      // daysdata.ctime.map((item)=>
      // {
      //   // console.log("itemmmmmmmm",item);
      //   console.log("itemmmmmmmmmmmm---->>>>>>>>>>>mmmmm",item)
      //   if(item.weather==t)
      //   {
      //     // const t2=item.img;
      //     console.log("-----------------------------------------");
      //     console.log("itemmmmmmmmmmm",item.img)
      //     // const t2 = item.img.match(/"(.*?)"/)[1];
      //     // console.log("dataaaaaaaaaaaa of imageeeeeeeeeeeeee",t2)
      //     // console.log("matchedddddddddddddd----------",t);
      //     seticon(item.img);
      //     console.log("iconnnnnnnn",icon);
          
      //   }
      // })
      
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
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bImage})` }} >
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

        <div className=" flex justify-around item center text-white mx-28 mb-28">
          <MdChevronLeft onClick={slideleft} size={200}/>
          <div id="slider" className="flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            {
              Details.hData.map((item,index)=>
              {
                // console.log("---->>>>>----itemmmmmmmmm--",item);
                console.log("data for day =========>",Array.isArray(daysdata.day))
                console.log("data for night ---------->",Array.isArray(daysdata.night))
                // let getindex=daysdata.findIndex(response=>response.weather==item.condition.text);
                let getindexDay = -1; // Initialize index for day to -1
                let getindexNight = -1; // Initialize index for night to -1

                if (Array.isArray(daysdata.day)) {
                  getindexDay = daysdata.day.findIndex(response => response.weather === item.condition.text);
                }

                if (Array.isArray(daysdata.night)) {
                  getindexNight = daysdata.night.findIndex(response => response.weather === item.condition.text);
                }
                // console.log("getindexxxxxxxxxxxxxx",getindex);
                
                let tm=(item.time).split(' ')[1];
                let tmm=tm.split(':')[0];
                console.log("getindexdayyyyy",getindexDay)
                // console.log("getindexnight",getindexNight)
                console.log("tm----------------",tm);
                console.log("tm----------------",tmm);
                return(
                  <div className="flex flex-col justify-center items-center mx-20">
                    <div class=""></div>
                    <div className="text-center">{tm} {tmm<12 ?"AM" : "PM"}</div>
                    <div className="text-center">{item.temp_c.toFixed(0)}&deg;</div>
                    {/* <img src={daysdata.day[getindexDay].img} alt="" /> */}
                    {tmm >= 4 && tmm < 16 ? (
                      <img src={daysdata.day[getindexDay].img} alt="" />
                    ) : (
                     
                      <img src={daysdata.night[getindexNight].img} alt="" />
                      
                    )}
                    <div className="text-center">{item.condition.text}</div>
                  </div>
                )
              })
            }  
          </div>
          <MdChevronRight onClick={slideright} size={200}/>
        </div>
      </div>
    </div>
  );
}

export default App;
