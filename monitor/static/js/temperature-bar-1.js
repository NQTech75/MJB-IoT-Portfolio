
// get html canvas
var chartCanvasTemperature = document.getElementById('Temperature-Bar')
// set data for graph
var barData = {
    labels: ['Current'],
    datasets: [{
        label: 'Temperature',
        data: [15],
        borderWidth: 1,
        backgroundColor: [
            'rgba(241, 89, 70, 0.5)',
        ],
        borderColor: [
            'rgba(241, 89, 70, 1)',
        ],
    }],
}
// set options for graph
var barOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
}
// create new graph
var myChartTemperature = new Chart(chartCanvasTemperature, {
    type: 'bar',
    data: barData,
    options: barOptions,
    
})

// function to update data for graph
async function updateTemperature() {
    let temps = await getTemperature();
    myChartTemperature.data.datasets[0].data = [temps.temperature]
    myChartTemperature.update()

}

// get the data from api
async function getTemperature(){
    let link = 'http://127.0.0.1:5000/api/temperature';
    try {
        let result = await fetch(link);
        return await result.json();
        }catch(error){
            console.log(error);
        }
}

// run the update function
updateTemperature()