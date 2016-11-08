// ===========================================
// Function that displays current weather data
// ===========================================

function displayCurrent( data ) {
    
    // ================================
    // Creation of variables to be used 
    // ================================
    
    let value = data;
    
    let date = new Date(value.time * 1000);
    date = (date.toString(-5)).slice(0, 10);                 
    let time = new Date(value.time * 1000);
    time = (time.toString(-5)).slice(16,21);
    time = set12HourTime(time);
    
    let tempCelcius = Math.round(value.temperature);
    let tempImperial = Math.round((value.temperature * 1.8) + 32);
    
    let summary = value.summary;
    let feels = Math.round(value.apparentTemperature);
    let humidity = Math.round(value.humidity * 100);
    let pop = Math.round(value.precipProbability * 100);
    
    let tag = getTag(value.icon);
    
    // ===========================================
    // Creation of HTML Elements that display data
    // ===========================================
    
    var div = document.createElement("div");
    
    // Paragraph 1 that contains Date and Time
    var nodeTime = document.createElement("p");
    nodeTime.innerHTML = date + "<br>" + time;
    div.appendChild(nodeTime);
    
    // Paragraph 2 that contains Temperature
    var nodeTempC = document.createElement("p");
    nodeTempC.innerHTML = tempCelcius + "\xB0C";
    div.appendChild(nodeTempC);
    
    // Paragraph 3 that contains Summary data
    var nodeSum = document.createElement("p");
    nodeSum.innerHTML = summary + "<br>Feels Like: " + feels + "\xB0C<br>PoP: " + pop + "%<br>Humidity: " + humidity + "%";
    div.appendChild(nodeSum);
    
    // Italic element that contains Icon displaying current weather type
    var iTag = document.createElement("i");
    iTag.classList.add("wi");    
    iTag.classList.add(tag);
    div.appendChild(iTag);
    
    // Appends Element div to div.current
    document.querySelector(".current").appendChild(div);
    
}