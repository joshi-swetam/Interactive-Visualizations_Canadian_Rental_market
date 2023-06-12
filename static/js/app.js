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
let provinces;
let ar_trend_chart;
let vr_trend_chart;

d3.json(`${baseUrl}/province_trend_by_year`)
.then(
    function(data)
    { 
        province_trend_by_year = data;

        provinces = province_trend_by_year.map((item) => item.Province);;

        renderTrendChartAverageRent();
        renderTrendChartVacancyRate();
    });

function updateProvinceSelection(button, province) {
    const index = provinces.findIndex(el => {
        return el === province;
      });
    
    if(index < 0) {
        provinces.push(province);
        $(button).removeClass("disabled");
    }
    else {
        provinces.splice(index, 1).sort(function(a, b){return a - b});
        $(button).addClass("disabled");
    }

    renderTrendChartAverageRent();
    renderTrendChartVacancyRate();
}

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

function getDatasetAverageRent(province) {

    const province_data = province_trend_by_year.filter(
        function(province_trend)
        { 
            return province_trend.Province == province;
        })[0];

    const averageRents = province_data.AverageRents.sort(function(a, b){return a.Year - b.Year})

    const dict = {
        label: province,
        data: averageRents.map((item) => item.AverageRent),
        borderColor: getColor(province),
        backgroundColor: getColor(province),
      };

    return dict;
}

function renderTrendChartAverageRent() {
    const years = province_trend_by_year[0].AverageRents.map((item) => item.Year);

    datasets = [];
    
    provinces.forEach((province) => {
         datasets.push(getDatasetAverageRent(province));
    });

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
                text: 'Average Rent Trend - YoY - By Province'
            }
            }
        },
    };
    
    if(ar_trend_chart != undefined)
        ar_trend_chart.destroy();

    ar_trend_chart = new Chart("ar_trend_chart", config);
}

function getDatasetVacancyRate(province) {

    const province_data = province_trend_by_year.filter(
        function(province_trend)
        { 
            return province_trend.Province == province;
        })[0];

    const vacancyRates = province_data.VacancyRates.sort(function(a, b){return a.Year - b.Year})

    const dict = {
        label: province,
        data: vacancyRates.map((item) => item.VacancyRate),
        borderColor: getColor(province),
        backgroundColor: getColor(province),
      };

    return dict;
}

function renderTrendChartVacancyRate() {
    const years = province_trend_by_year[0].VacancyRates.map((item) => item.Year);

    datasets = [];
    
    provinces.forEach((province) => {
         datasets.push(getDatasetVacancyRate(province));
    });

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
                text: 'VacancyRate Rate - YoY - By Province'
            }
            }
        },
    };
    
    if(vr_trend_chart != undefined)
        vr_trend_chart.destroy();

    vr_trend_chart = new Chart("vr_trend_chart", config);
}