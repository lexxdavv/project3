function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeather);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function  fetchWeather (ev) {
    //use the values from latitude and longitude to fetch the weather
    let lat = ev.coords.latitude;
    let lon = ev.coords.longitude;
    let key = '03929d38fd6e7848f6c6eeb58f34fbc7';
    let lang = 'en';
    let units = 'imperial';
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    //fetch the weather
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
       // console.log(data)
       console.log(data.current.weather[0].main)
        // make api call
        apicallSpotify(data.current.weather[0].main);

      })
      .catch(console.err);
  };


function apicallSpotify(weather) {
  let playlist = [];
  // if (weather == Cloudy){ playlist.push = "playlist_id=540dIoYAGUzg1r76LtlZjz"}

  if (weather == "Rain" || weather == "Snow") {
    playlist.push("42ifFanjIBALfwSvuuBy7d")  // statement
  } else if(weather == "Clear"){ 
    playlist.push("40h7ZtsuqhhXCJ6N91eUkB")  // statement
  }else if(weather == "Clouds" || weather == "Haze"){
    playlist.push("540dIoYAGUzg1r76LtlZjz") 
    // statement
  } else {console.log("error")}



 // client_ID = "Client ID b8972c1e985f493a9ee8bdc73c9d7252";
  accessToken = "BQBuvJN4OGNAo3cbZmGRAO0sN8wYRKLN8AQaal4B7PGVfOvLzlJajC--iAzz_uJAq-ml7jsWw-efTt9pFin_BCuEsxxUZPsiGBpFeJwOwiHy25Jf6GBasiOsZU0GkJ7rZpKD0uZmypNj6y7nP5hEzTgQOucW1m9nVdlJabI";
  
  playlist_id = playlist[0];
  console.log(accessToken);
  // https://developer.spotify.com/console/get-playlist/?playlist_id=540dIoYAGUzg1r76LtlZjz&market=&fields=&additional_types=
            
    $.ajax({
        //CALL SETTINGS & PARAMS
        type: 'GET',
        dataType: 'json',
        url: `https://api.spotify.com/v1/playlists/${playlist_id}`,
        async: false,
        crossDomain: true,
        headers: {'Authorization' : 'Bearer ' + accessToken},
        
        //What to do when the call finishes
        complete: function (response) {
            if (response.readyState === 4 && response.status === 200) {
                console.log(response);
                audioIndex = [];
                track1 = response.responseJSON.tracks.items[0].track.name;
                track2 = response.responseJSON.tracks.items[1].track.name;
                track3 = response.responseJSON.tracks.items[2].track.name;
                track4 = response.responseJSON.tracks.items[3].track.name;
                track5 = response.responseJSON.tracks.items[4].track.name;
                track6 = response.responseJSON.tracks.items[5].track.name;
                track7 = response.responseJSON.tracks.items[6].track.name;
                track8 = response.responseJSON.tracks.items[7].track.name;
                track9 = response.responseJSON.tracks.items[8].track.name;
                console.log(`${track1}, ${track2},`); // repeat for all

                console.log(response);
                audioIndex.push(response.responseJSON.tracks.items[0].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[1].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[2].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[3].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[4].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[5].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[6].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[7].track.preview_url);
                audioIndex.push(response.responseJSON.tracks.items[8].track.preview_url);
                console.log(`${track1}, ${track2},`); // repeat for all


              
              let audio = new Audio(audioIndex[0]);
              let current = 0;
              audio.play();

              audio.addEventListener('ended',function(e){
                current++; //Your current index
                if(current < 9){ //Check if there is other audio.
                audio.src = audioIndex[current];
                audio.play();
                }
            });


                
                
              
                
  

            }
        }
    });
}

//apicallSpotify();


