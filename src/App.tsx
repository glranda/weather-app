import React from 'react';

function App() {

     // location test
     function initGeolocation()
     {
        if( navigator.geolocation )
        {
           navigator.geolocation.getCurrentPosition( success, fail );
        }
        else
        {
           alert("Sorry, your browser does not support geolocation services.");
        }
     }

     function success(position: any)
     {
        console.log(position.coords.longitude, ' ', position.coords.latitude )
        console.log('https://api.weatherapi.com/v1/current.json?key=d5b70fe190b04b6192a143809221306&q=48.8567,2.3508')
     }

     function fail()
     {
      console.log('fail');
     }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={initGeolocation}>
          TEST BUTTON
        </button>
      </header>
    </div>
  );
}

export default App;
