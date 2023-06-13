const baseUrl = 'http://127.0.0.1:5000/api/v1.0';


// d3.json(`${baseUrl}/province_centers`)
//     .then(
//         function(rental_data)
//         { 
//             console.log("Rental Data for Province + Centers with Geo Location");
//             console.log("=====================================================");
//             console.log(rental_data);
//         });

let province_trend_by_year;
let chart;

d3.json(`${baseUrl}/province_trend_by_year`)
.then(
    function(data)
    { 
        province_trend_by_year = data;

        renderChart("Alta");
    });

function getColor(province) {
    if(province == "Alta")
        return "red";
    else if(province == "B.C.")
        return "blue";
    else if(province == "Ont.")
        return "green";
    else if(province == "Que")
        return "yellow";
    else if(province == "Man.")
        return "black";
}

function getDataset(province) {

    const province_data = province_trend_by_year.filter(
        function(province_trend)
        { 
            return province_trend.Province == province;
        })[0];

        console.log(province);
        console.log(province_data);

    const averageRents = province_data.AverageRents.sort(function(a, b){return a.Year - b.Year})

    const dict = {
        label: province,
        data: averageRents.map((item) => item.AverageRent),
        borderColor: getColor(province),
        backgroundColor: getColor(province),
      };

    return dict;
}

function renderChart(province) {
    //const provinces = province_trend_by_year.map((item) => item.Province);
    const years = province_trend_by_year[0].AverageRents.map((item) => item.Year);

    datasets = [];
    
    // provinces.forEach((province) => {
    //     datasets.push(getDataset(province));
    // });

    datasets.push(getDataset(province));

    const labels = years;
    const data = {
        labels: labels,
        datasets: datasets
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Average Rent Trend by Province'
            }
            }
        },
    };
    console.log(chart);
    if(chart!=undefined)
        chart.destroy();
    chart = new Chart("chart", config);
}