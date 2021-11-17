// list for readings and time base
var temperatureResults = [];
var pressureResults = [];
var humidityResults = [];
var timeResults = [];    
var testResults = [10,15,25,11,14]; 

// function to get data for graph
async function getEnvironmentHistory() {
    //read in the dat from API
    let api_in = await getEnvironment();
    // remove the readings from the outer object
    let vals=Object.values(api_in);  
    // go through readings and push the data to the appropriate array
    vals.forEach(val => { 
            val.forEach(reading =>{
                for (let key in reading){
                    if (key == "temperature"){
                        temperatureResults.push(parseFloat(reading[key]));                       
                    }
                    else if (key == "pressure"){
                        pressureResults.push(parseFloat(reading[key]));                       
                    }
                    else if (key == "humidity"){
                        humidityResults.push(parseFloat(reading[key]));                       
                    }
                    else{
                        timeResults.push(reading[key]);
                    }                   
                }                                 
            });                                                  
    });
}

// get the data from API
async function getEnvironment(){
    // set address for api
    let link = 'http://127.0.0.1:5000/api/environment/25';
    // use try - catch to catch error from API
    try {
        let result = await fetch(link);
        return await result.json();
        }
    catch(error){
            console.log(error);
        }
}

// set up line graph
var lineChartCanvasEnvironment = document.getElementById('Environment-Line')
var environmentData = {
    // set the x axis labels a the time stamps
    labels: timeResults,
    // data set for each value type
    datasets: [
        {
            label: 'temperature',
            line: '',
            data: testResults,
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            yAxisID: 'temp',
            borderColor: [
                'rgba(241, 89, 70, 1)',
            ],
        },
        {
            label: 'Pressure',
            line: '',
            data: testResults,
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            yAxisID:'pressure',
            borderColor: [
                'rgba(157, 105, 163, 1)',
            ],
        },
        {
            label: 'Humidity',
            line: '',
            data: testResults,
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            yAxisID:'humidity',
            borderColor: [
                'rgba(249, 194, 46, 1)',
            ],
        },
        
    ],
}
// set line options 
var lineOptions = {
    legend: {display: true},
    title: {
        display: true,
        text: 'Pressure History'
    },
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Time',
            },
        }],
        // need label and scale for each data type
        // this is matched to dataset using id
        yAxes: [{               
                id:'pressure',
                scaleLabel:{
                    display:true,
                    labelString: 'Pressures',
                    fontColor: [
                'rgba(157, 105, 163, 1)',
                ],
                },
                type:'linear',
                display: true,
                position: 'right',

            }, 
            {
                id:'temp',
                scaleLabel:{
                    display:true,
                    labelString: 'Temperature',
                    fontColor: [
                'rgba(241, 89, 70, 1)',
                ],
                },
                type:'linear',
                display: true,
                position: 'left',                       
            },
            {
                id:'humidity',
                scaleLabel:{
                    display:true,
                    labelString: 'Humidity', 
                    fontColor: [
                'rgba(249, 194, 46, 1)',
                ],
                },
                type:'linear',
                display: true,
                position: 'right',                
            }],
    },
}
// create chart
var myLineChartEnvironment = new Chart(lineChartCanvasEnvironment, {
    type: 'line',
    data: environmentData,
    options: lineOptions,
})

// function to update data for graph
async function updateEnvironment() {
    let temps = await getEnvironmentHistory();
    myLineChartEnvironment.data.datasets[0].data = temperatureResults;
    myLineChartEnvironment.data.datasets[1].data = pressureResults;
    myLineChartEnvironment.data.datasets[2].data = humidityResults;
    myLineChartEnvironment.update()   
}
// run the update
updateEnvironment()