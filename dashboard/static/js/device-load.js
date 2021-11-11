var pieChartCanvasCPULoad = document.getElementById('Device-Load-Pie')
var pieData = {
    labels: ['CPU Load', 'Idle'],
    datasets: [{
        data: [36, 64],
        borderWidth: 2,
        borderAlign: 'inner',
        backgroundColor: [
            'rgba(9,12, 155, 0.5)',
            'rgba(0, 168, 120, 0.5)',
        ],
        borderColor: [
            'rgba(9,12, 155, 1)',
            'rgba(0, 168, 120, 1)',
        ],
    }],
}

var pieOptions = {}

var myPieChartCPULoad = new Chart(pieChartCanvasCPULoad, {
    type: 'pie',
    data: pieData,
    options: pieOptions,
})
