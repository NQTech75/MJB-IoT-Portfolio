// get html canvas
var pieChartCanvasCPULoad = document.getElementById('Device-Load-Pie')
// set data for graph
var pieData = {
    labels: ['CPU Load', 'Idle'],
    datasets: [{
        data: [30, 70],
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

// set options for graph
var pieOptions = {}

// create new graph
var myPieChartCPULoad = new Chart(pieChartCanvasCPULoad, {
    type: 'pie',
    data: pieData,
    options: pieOptions,
})

// function to update data for graph
async function updateCPULoad() {
    let temps = await getCPULoad();
    // set idle 100% - current load
    var idle = 100 - temps.CPULoad;
    myPieChartCPULoad.data.datasets[0].data = [temps.CPULoad,idle]
    myPieChartCPULoad.update()

}

// get the data from api
async function getCPULoad(){
    let link = 'http://127.0.0.1:5000/api/device-load';
    try {
        let result = await fetch(link);
        return await result.json();
        }catch(error){
            console.log(error);
        }
}

// run the update function
updateCPULoad()