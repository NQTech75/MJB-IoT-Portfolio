// list for readings and time base
var temperatureResults = [];
var pressureResults = [];
var humidityResults = [];
var timeResults = [];    
var testResults = [10,15,25,11,14]; 

// function to get data for graph
async function getPressureHistory() {
    //read in the dat from API
    let api_in = await getPressures();
    // remove the readings from the outer object
    let vals=Object.values(api_in);  
    // go through readings and push the data to the appropriate array
    vals.forEach(val => { 
            val.forEach(reading =>{
                for (let key in reading){
                    if (key == "pressure"){
                        pressureResults.push(parseFloat(reading[key]));                       
                    }
                    else{
                        timeResults.push(reading[key]);
                    }                   
                }                                 
            });                                                  
    });
}

// get the data from API
async function getPressures(){
    // set address for api
    let link = 'http://127.0.0.1:5000/api/pressure/25';
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
var lineChartCanvasPressure = document.getElementById('Pressure-Line')
var pressureData = {
    // set the x axis labels a the time stamps
    labels: timeResults,
    // data set for each value type
    datasets: [
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
                position: 'left',
            }],             
}
}
                
// create chart
var myLineChartPressure = new Chart(lineChartCanvasPressure, {
    type: 'line',
    data: pressureData,
    options: lineOptions,
})

// function to update data for graph
async function updatePressure() {
    let temps = await getPressureHistory();
    myLineChartPressure.data.datasets[0].data = pressureResults;
    
    myLineChartPressure.update()   
}
// run the update
updatePressure()