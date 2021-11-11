var chartCanvasTemperature = document.getElementById('Temperature-Bar')
var barData = {
    labels: ['Current'],
    datasets: [{
        label: 'Temperature',
        data: [32],
        borderWidth: 1,
        backgroundColor: [
            'rgba(241, 89, 70, 0.5)',
        ],
        borderColor: [
            'rgba(241, 89, 70, 1)',
        ],
    }],
}

var barOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
}

var myChartTemperature = new Chart(chartCanvasTemperature, {
    type: 'bar',
    data: barData,
    options: barOptions,
})