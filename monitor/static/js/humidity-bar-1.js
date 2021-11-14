// get html canvas
var barChartCanvasHumidity = document.getElementById('Humidity-Bar')
// set data for graph
var barData = {
    labels: ['Current'],
    datasets: [{
        label: 'Humidity',
        data: [62],
        borderWidth: 1,
        backgroundColor: [
            'rgba(249, 194, 46, 0.5)',
        ],
        borderColor: [
            'rgba(249, 194, 46, 1)',
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
var myChartHumidity = new Chart(barChartCanvasHumidity, {
    type: 'bar',
    data: barData,
    options: barOptions,
})


// function to update data for graph
async function updateHumidity() {
    let temps = await getHumidity();
    myChartHumidity.data.datasets[0].data = [temps.humidity]
    myChartHumidity.update()

}

// get the data from api
async function getHumidity(){
    let link = 'http://127.0.0.1:5000/api/humidity';
    try {
        let result = await fetch(link);
        return await result.json();
        }catch(error){
            console.log(error);
        }
}

// run the update function
updateHumidity()