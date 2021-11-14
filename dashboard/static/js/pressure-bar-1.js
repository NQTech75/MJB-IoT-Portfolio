// get html canvas
var barChartCanvasPressure = document.getElementById('Pressure-Bar')
// set data for graph
var barData = {
    labels: ['Current'],
    datasets: [{
        label: 'Pressure',
        data: [1012.3],
        borderWidth: 1,
        backgroundColor: [
            'rgba(157, 105, 163, 0.5)',
        ],
        borderColor: [
            'rgba(157, 105, 163, 1)',
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
var myChartPressure = new Chart(barChartCanvasPressure, {
    type: 'bar',
    data: barData,
    options: barOptions,
})


// function to update data for graph
async function updatePressure() {
    let temps = await getPressure();
    temps.forEach(temp=> {
        myChartPressure.data.datasets[0].data = temp.pressure
    myChartPressure.update()
    });
}

// get the data from api
async function getPressure(){
    let link = 'http://127.0.0.1:5000/api/pressure';
    try {
        let result = await fetch(link);
        return await result.json();
        }catch(error){
            console.log(error);
        }
}

// run the update function
updatePressure()