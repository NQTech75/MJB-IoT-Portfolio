var barChartCanvasPressure = document.getElementById('Pressure-Bar')
var barData = {
    labels: ['Current'],
    datasets: [{
        label: 'Pressure',
        data: [1018.9],
        borderWidth: 1,
        backgroundColor: [
            'rgba(157, 105, 163, 0.5)',
        ],
        borderColor: [
            'rgba(157, 105, 163, 1)',
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

var myChartPressure = new Chart(barChartCanvasPressure, {
    type: 'bar',
    data: barData,
    options: barOptions,
})