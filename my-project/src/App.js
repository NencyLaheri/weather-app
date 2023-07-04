import './App.css';
import weatherImage from './Images/weather.jpg'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiSunCloudyLine } from 'react-icons/ri'
import Sidebar from './components/Sidebar';
import { useState } from 'react';


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
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <div className="flex flex-col h-full py-10">
        <div className="flex justify-between mx-12 ">
          <div><h1 className="tracking-widest cursor-pointer text-black">The Weather</h1></div>
          
          <div className="text-3xl text-white cursor-pointer" >
            <RxHamburgerMenu  onClick={toggleSidebar} />
          </div>
          
          {isSidebarOpen && <Sidebar setPrecipitation={setPrecipitation} city={city} setCity={setCity} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} forecast={forecast} setForecast={setForecast}/>}
        </div>
     
     
        <div className="flex h-full items-end mx-12">
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
              <span className=''><RiSunCloudyLine className='text-5xl'/></span>
              <p>{Precipitation}</p>
              {/* <p>Cloudy</p> */}
            </div>
            
          </div>
        </div> 
    </div>
    </div>
  );
}

export default App;
