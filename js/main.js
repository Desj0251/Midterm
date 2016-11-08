document.addEventListener("DOMContentLoaded", function(){ serverData.getJSON(); });

// ===========================================================
// Object that retrieves data from forecast.php at edumedia.ca
// and calls display functions.
// ===========================================================

let serverData = {
     url: "https://desj0251.edumedia.ca/mad9014/weather/forecast.php",
     httpRequest: "GET",
     
     getJSON: function () {
         
         let headers = new Headers();
         headers.append("Content-Type", "text/plain");
         headers.append("Accept", "application/json; charset=utf-8");
         
         let options = {
             method: serverData.httpRequest,
             mode: "cors",
             headers: headers
         };
         
         let request = new Request(serverData.url, options);
         console.log(request);
         
         fetch(request)
         
         .then(function (response){
             return response.json();
         })
         
         .then(function (data){
             
             // Calls functions that creates HTML elements to display data
             console.log(data);
             // displayCurrent(data.currently);
             displayHourlyData(data.hourly);
             
         })
         .catch(function (err){
             alert("Error:" + err.message);
         });
     }
};

// ==========================================
// Function that displays hourly weather data
// ==========================================

function displayHourlyData( data ) {
    
    let value = data;
    
    // ==========================================================
    // Checks to see if data was properly retrieved and make sure
    // 24 hours of data is available and display summary as h3
    // ==========================================================
    
    const HOURS_TO_DISPLAY = 24;
    let number_hours = null;
    
    if (value.data.length == 0) {
        alert("Error retrieving weather data! Try again later");
        return;
    }
    if (value.data.length >= HOURS_TO_DISPLAY) {
        number_hours = HOURS_TO_DISPLAY;
    } else {
        number_hours = value.data.length;
    }
    
//    var nodeSummary = document.createElement("h3");
//    nodeSummary.innerHTML = data.summary;
//    document.querySelector(".Hourlyforecast").appendChild(nodeSummary);
    
    // =========================================================
    // For loop that generates hourly data for the next 24 hours
    // or however many hours were recieved from the server
    // =========================================================
    
    for (var i = 0; i < number_hours; i++){
        
        // ================================
        // Creation of variables to be used 
        // ================================
        
        let date = new Date(value.data[i].time * 1000);
        date = (date.toString(-5)).slice(0, 3);     
        let time = new Date(value.data[i].time * 1000);
        time = (time.toString(-5)).slice(16,21);
        time = set12HourTime(time);
        
        let tempCelcius = Math.round(value.data[i].temperature);
        let tempImperial = Math.round((value.data[i].temperature * 1.8) + 32);
        
        let feels = Math.round(value.data[i].apparentTemperature);
        let humidity = Math.round(value.data[i].humidity * 100);
        let pop = Math.round(value.data[i].precipProbability * 100);
        
        var tag = getTag(value.data[i].icon);
        
        // ===========================================
        // Creation of HTML Elements that display data
        // ===========================================
        
        var div = document.createElement("div");
        
        // Paragraph 1 that contains Date and Time
        var nodeTime = document.createElement("p");
        nodeTime.classList.add("time");
        nodeTime.innerHTML = date + "<br>" + time;
        div.appendChild(nodeTime);
        
        // Paragraph 2 that contains Temperature
        var nodeTemp = document.createElement("p");
        nodeTemp.classList.add("temp");
        nodeTemp.innerHTML = tempCelcius + "\xB0C";
        div.appendChild(nodeTemp);
        
        // Paragraph 3 that contains Summary data
        var nodeSum = document.createElement("p");
        nodeSum.classList.add("summary");
        nodeSum.innerHTML = "Feels Like: " + feels + "\xB0C<br>PoP: " + pop + "%<br>Humidity: " + humidity + "%";
        div.appendChild(nodeSum);
        
        // Italic element that contains an icon to display condition type
        var iTag = document.createElement("i");
        iTag.classList.add("wi");
        iTag.classList.add(tag);
        div.appendChild(iTag);
        
        // Give div classname of tag in order to CSS colours based on weather type
        div.classList.add(value.data[i].icon);
        
        // Append div element to div.Hourlyforecast
        document.querySelector(".Hourlyforecast").appendChild(div);
        
    }
}

// ==================================================
// Function that converts icon data to math icon font
// ==================================================

function getTag( data ) {

    var tag = null;
    
    if (data == "clear-day") { tag = "wi-day-sunny"; }
    if (data == "clear-night") { tag = "wi-night-clear"; }
    if (data == "rain") { tag = "wi-rain"; }
    if (data == "snow") { tag = "wi-snow"; }
    if (data == "sleet") { tag = "wi-sleet"; }
    if (data == "wind") { tag = "wi-windy"; }
    if (data == "fog") { tag = "wi-fog"; }
    if (data == "cloudy") { tag = "wi-cloudy"; }
    if (data == "partly-cloudy-day") { tag = "wi-day-cloudy"; }
    if (data == "partly-cloudy-night") { tag = "wi-night-alt-cloudy"; }
    
    return tag; // Tag is returned as converted data
    
}

// =================================================
// Function that converts 24 hour into 12 hour clock
// =================================================

function set12HourTime ( data ) {

    var hours = data.slice(0,2);
    var minutes = data.slice(3,5);
    
    if ( hours > 12 ){
        hours = (hours - 12) + " PM";
        //hours = (hours - 12) + ":" + minutes + " PM";
    } else if ( hours == 0){
        hours = 12 + " AM";
        //hours = 12 + ":" + minutes + " AM"
    } else if ( hours == 12 ){
        hours = hours + " PM";
        //hours = hours + ":" + minutes + " PM";
    } else {
        hours = (hours - 0) + " AM";
        // hours = (hours - 0) + ":" + minutes + " AM";
    }
    
    return hours; // Returns hours AM/PM as string
        
}