var barChartCanvasHumidity = document.getElementById('Humidity-Bar')
var barData = {
    labels: ['Current'],
    datasets: [{
        label: 'Humidity',
        data: [76],
        borderWidth: 1,
        backgroundColor: [
            'rgba(249, 194, 46, 0.5)',
        ],
        borderColor: [
            'rgba(249, 194, 46, 1)',
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

var myChartHumidity = new Chart(barChartCanvasHumidity, {
    type: 'bar',
    data: barData,
    options: barOptions,
})