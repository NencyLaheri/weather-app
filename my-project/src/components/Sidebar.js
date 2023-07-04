import React, { useState,useEffect } from 'react'
import { GrClose } from 'react-icons/gr';
import { FiSearch } from 'react-icons/fi';
// import feather from 'feather-icons';
import axios from 'axios';


const Sidebar = ({setInputValue,inputValue, Details, weatherApi ,setPrecipitation,isSidebarOpen,city,setCity, toggleSidebar,forecast,setForecast }) => {
  console.log("cityyyyyyy",city)
  const [isFocused, setIsFocused] = useState(false);
  // const [inputValue, setInputValue] = useState(city);
  const [locationKey, setLocationKey] = useState(null);
  const [value, setValue] = useState('');
  const apiKey = '697AZ3G3FeJrAzgv2RpmmSNuQoTkcFK8';
  // const dtl={
  //   cloudy:'',
  //   humidity:'',
  //   wind:'',
  // };
  // const [Details, setDetails] = useState(dtl);

  useEffect(() => { 
    // fetchData()
    // .then(() => weatherData())
    // .catch((error) => {
    //   console.error('Error fetching data:', error);
    // });
    weatherApi();
  },[city]);

 
  const handleIconClick = () => {
    const inputElement = document.getElementById('myInput');
    inputElement.focus();
    setIsFocused(true);
    
    if(inputValue!="")
    {
      setInputValue(inputValue);
      // setCity(inputValue);
      // console.log("input",inputValue);
      // console.log("city value changed",city);
      weatherApi();
      // weatherApi().then(()=>setCity(inputValue)).catch((error)=>{console.log("errorrrrrr")})
      // fetchData();
      // weatherData();
      // fetchData()
      //   .then(() => weatherData())
      //   .catch((error) => {
      //     console.error('Error fetching data:', error);
      //   });
    }
    
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
 
  const weatherapiCall=(e)=>
  {
    const selectedCity = e.target.getAttribute('value');
    console.log("get->>>>>>>>",selectedCity);
    // setCity(selectedCity)
    setInputValue(selectedCity);
    console.log("setted city->>>>",city);
    weatherApi();
    // fetchData();
    // weatherData();
    // fetchData()
    //   .then(() => weatherData())
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
  }

  
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
  //       {
  //         params: {
  //           apikey: apiKey,
  //           q: city,
  //         },
  //       }
  //     );

  //     if (response.data && response.data.length > 0) {
  //       const firstResult = response.data[0];
  //       setLocationKey(firstResult.Key);
  //     } else {
  //       setLocationKey(null);
  //     }
  //   } catch (error) {
  //     console.error('Error searching for location:', error);
  //   }
  //   console.log("data->>>>",locationKey);
  // };

  // const weatherData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
  //       {
  //         params: {
  //           apikey: apiKey,
  //         },
  //       }
  //     );
  //     console.log("data---------------",response.data);
  //     const pt=response.data.DailyForecasts[0].Day.PrecipitationType;
  //     const d=response.data.DailyForecasts[0].Temperature.Minimum.Value; 
  //     const w=5/9*(d-32); 
  //     setForecast(w.toFixed(0));
  //     setPrecipitation(pt);
  //   } catch (error)   {
  //     console.error('Error fetching forecast data:', error);
  //   }
  //   console.log("weather--->",forecast)
  // };
  
 
  // const weatherApi=async()=>
  // {
  //   try {
  //     const apiKey = 'd6c135f0980146ddac955040230307'; 
  //     const location = inputValue 

      
    
  //     const response = await axios.get(
  //       `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
  //     ).catch(function (error) {
  //       if (error.response) {
  //         console.log(error.response.data.error.code);
  //         alert("No matching location found")
  //         // console.log(error.response.status);
  //         // console.log(error.response.headers);
  //       } else if (error.request) {
  //         console.log(error.request);
  //       } else {
  //         console.log('Error', error.message);
  //       }
       
  //     });
  //     console.log("--------",response);

     
  //     const weatherData = await response.data;
    
  //     console.log("dataaaaaaaaaaaaaaaaaaaaaa------->>",weatherData);
  //     console.log("Weather Data--->>>>>>>>",weatherData.current.condition.text);
  //     const precipitation=weatherData.current.condition.text;
  //     setPrecipitation(precipitation);
  //     const f=weatherData.current.temp_c.toFixed(0);
  //     console.log("Temparature->>>>>.",f)
  //     setForecast(f);
  //     const dt=weatherData.current.cloud;
  //     const hm=weatherData.current.humidity;
  //     const wd=weatherData.current.wind_kph;
  //     console.log("Cloudy------>>>>",dt);
  //     console.log("Humidity------>>>>",hm);
  //     console.log("Wind------>>>>",wd);
  //     setDetails(dtl=> ({cloudy:dt,humidity:hm,wind:wd}));
  //     console.log("detailssssssss",Details.cloudy);
  //     setCity(weatherData.location.name);
  //     // Process and use the weather data as needed
  //     // ...
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //   }
  // }


  return (
    <>
   
    <div className={`bg-gray-300 opacity-90 w-96 h-full absolute top-0 right-0 ease-in duration-500 ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <div className="text-xl my-2 mx-3 flex justify-end">
        <GrClose onClick={toggleSidebar}/>
      </div>
      <div className='mt-10 '>
        <div className="mx-12">
          <div className="flex">
            {/* <input type="text" placeholder="" className="w-full h-12 hover:border-[#080808] focus:outline-none bg-transparent border-b border-[#5E5E5E] placeholder-[#5E5E5E] text-xl "/> */}
            <input id="myInput" value={inputValue}  onChange={handleInputChange} onBlur={handleBlur} type="text" placeholder="" className={`w-full h-12 hover:border-[#080808] focus:outline-none bg-transparent border-b border-[#5E5E5E] placeholder-[#5E5E5E] text-xl ${
          isFocused ? 'focus:border-[#080808]' : ''
        }`}/>    
            <div className="flex justify-center items-center text-3xl border-b border-[#5E5E5E]"  onClick={handleIconClick}>
              <FiSearch/>
            </div>
          </div>
        
        
          <div className="my-10 space-y-8 text-[#5E5E5E] text-xl list-none">
            <li className="hover:text-[#959595]" value="ahmedabad" onClick={weatherapiCall}>Ahmedabad</li>
            <li className="hover:text-[#959595]" value="surat" onClick={weatherapiCall}>Surat</li>
            <li className="hover:text-[#959595]" value="mumbai" onClick={weatherapiCall}>Mumbai</li>
            <li className="hover:text-[#959595]" value="vadodara" onClick={weatherapiCall}>Vadodara</li>
          </div>
          <div>
            <hr className="border-t border-[#5E5E5E]"/>
          </div>
          <div>
            <h1 className="text-2xl text-[#3F3F3F] py-10">Weather Details</h1>
            <div className="text-[#5E5E5E] space-y-8 text-xl">
              <p className="flex justify-between"><span>Cloudy</span><span>{Details.cloudy}%</span></p>
              <p className="flex justify-between"><span>Humidity</span><span>{Details.humidity}%</span></p>
              <p className="flex justify-between"><span>Wind</span><span>{Details.wind}%</span></p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
