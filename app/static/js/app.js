const baseUrl = '/api/v1.0';

let province_trend_by_year;
let provinces;
let years;
let ar_trend_chart;
let vr_trend_chart;
let nu_doughnut_total_chart;

d3.json(`${baseUrl}/province_trend_by_year`)
.then(
    function(data)
    { 
        province_trend_by_year = data;

        provinces = province_trend_by_year.map((item) => item.Province);
        years = province_trend_by_year[0].NumberOfUnits.map((item) => item.Year);

        years.forEach((year) => {
            d3.select("#selYear")
                .append("option")
                .text(year)
                .property("value", year);
        });

        renderTrendChartAverageRent();
        renderTrendChartVacancyRate();
        
        d3.select("#selYear").dispatch("change");
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
                text: 'Average Rent'
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
                text: 'Average Vacancy Rate'
            }
            }
        },
    };
    
    if(vr_trend_chart != undefined)
        vr_trend_chart.destroy();

    vr_trend_chart = new Chart("vr_trend_chart", config);
}

function renderNumberOfUnitsChart(year) {
    let num_units_dataset = province_trend_by_year.map((item) => {
        var year_units = item.NumberOfUnits.filter(
            function(y)
            { 
                return y.Year == parseInt(year);
            })[0];
        
        data_dict = {};
        data_dict["Province"] = item.Province;
        data_dict["NumberOfUnits"] = year_units.NumberOfUnits;

        return data_dict;
    });

    num_units_dataset = num_units_dataset.sort(function(a, b){return a.Province - b.Province});

    console.log(num_units_dataset);

    const data = {
        labels: num_units_dataset.map((el) => el.Province),
        datasets: [{
            data: num_units_dataset.map((el) => el.NumberOfUnits)
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
                responsive: true,
                plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Number of Units by Province'
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                       var dataset = data.datasets[tooltipItem.datasetIndex];
                      var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                      });
                      var currentValue = dataset.data[tooltipItem.index];
                      var precentage = Math.floor(((currentValue/total) * 100)+0.5);
                      return precentage + "%";
                    }
                  }
                }
            }
        },
    };
    
    if(nu_doughnut_total_chart != undefined)
        nu_doughnut_total_chart.destroy();

    nu_doughnut_total_chart = new Chart("nu_doughnut_total_chart", config);
}