const baseUrl = '/api/v1.0';

let province_trend_by_year;
let provinces;
let years;
let ar_trend_chart;
let vr_trend_chart;
let nu_doughnut_total_chart;

//call API and get province trends by year
d3.json(`${baseUrl}/province_trend_by_year`)
.then(
    function(data)
    { 
        // store data in variables for laer use
        province_trend_by_year = data;

        //create list of provinces
        provinces = province_trend_by_year.map((item) => item.Province);

        //create list of years
        years = province_trend_by_year[0].NumberOfUnits.map((item) => item.Year);

        //add years to year dropdown
        years.forEach((year) => {
            d3.select("#selYear")
                .append("option")
                .text(year)
                .property("value", year);
        });

        //render trend chart for average rents
        renderTrendChartAverageRent();

        //render trend chart for average vacancy rates
        renderTrendChartVacancyRate();
        
        //dispatch on chage even on year combobox to render doughnut chart
        d3.select("#selYear").dispatch("change");
    });

//function to handle province selection for trend charts
function updateProvinceSelection(button, province) {
    //get index of the province from provinces list
    const index = provinces.findIndex(el => {
        return el === province;
      });
    
    //if province is in the list, remove the province and disable button
    if(index < 0) {
        provinces.push(province);
        $(button).removeClass("disabled");
    }
    //if province is not in the list, add the province and enable button
    else {
        provinces.splice(index, 1).sort(function(a, b){return a - b});
        $(button).addClass("disabled");
    }

    //render trend chart for average rents
    renderTrendChartAverageRent();

    //render trend chart for average vacancy rates
    renderTrendChartVacancyRate();
}

//function to get color of trend line based on province
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

//function to get dataset based on province for trend chart
function getDatasetAverageRent(province) {

    //filter province_data based on province
    const province_data = province_trend_by_year.filter(
        function(province_trend)
        { 
            return province_trend.Province == province;
        })[0];

    //get and sort average rents for province and sort by year
    const averageRents = province_data.AverageRents.sort(function(a, b){return a.Year - b.Year})

    //create a dictionary for trend dataset for the provicne
    const dict = {
        label: province,
        data: averageRents.map((item) => item.AverageRent),
        borderColor: getColor(province),
        backgroundColor: getColor(province),
      };

    //return  dict
    return dict;
}

//render trend chart for average rent
function renderTrendChartAverageRent() {
    //get list of years
    const years = province_trend_by_year[0].AverageRents.map((item) => item.Year);

    datasets = [];
    
    //loop through active provinces and create dataset list
    provinces.forEach((province) => {
         datasets.push(getDatasetAverageRent(province));
    });

    //create data object for chart.js
    const labels = years;
    const data = {
        labels: labels,
        datasets: datasets
    };

    //create config object for chart.js
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
    
    //if chart exists, destroy it
    if(ar_trend_chart != undefined)
        ar_trend_chart.destroy();

    //render cahrt
    ar_trend_chart = new Chart("ar_trend_chart", config);
}

//function to get dataset based on province for trend chart
function getDatasetVacancyRate(province) {
    
    //filter province_data based on province
    const province_data = province_trend_by_year.filter(
        function(province_trend)
        { 
            return province_trend.Province == province;
        })[0];

    //get and sort vacancy rate for province and sort by year
    const vacancyRates = province_data.VacancyRates.sort(function(a, b){return a.Year - b.Year})

    //create a dictionary for trend dataset for the provicne
    const dict = {
        label: province,
        data: vacancyRates.map((item) => item.VacancyRate),
        borderColor: getColor(province),
        backgroundColor: getColor(province),
      };

    //return  dict
    return dict;
}

//render trend chart for vacancy rates
function renderTrendChartVacancyRate() {
    //get list of years
    const years = province_trend_by_year[0].VacancyRates.map((item) => item.Year);

    datasets = [];
    
    //loop through active provinces and create dataset list
    provinces.forEach((province) => {
         datasets.push(getDatasetVacancyRate(province));
    });

    //create data object for chart.js
    const labels = years;
    const data = {
        labels: labels,
        datasets: datasets
    };

    //create config object for chart.js
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
    
    //if chart exists, destroy it
    if(vr_trend_chart != undefined)
        vr_trend_chart.destroy();

    //render cahrt
    vr_trend_chart = new Chart("vr_trend_chart", config);
}

//render doughnut chart for selected year
function renderNumberOfUnitsChart(year) {
    //create dataset for doughnut chart for selected year
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

    //sort the dataset by province
    num_units_dataset = num_units_dataset.sort(function(a, b){return a.Province - b.Province});

    //create data object for chart.js
    const data = {
        labels: num_units_dataset.map((el) => el.Province),
        datasets: [{
            data: num_units_dataset.map((el) => el.NumberOfUnits)
        }]
    };

    //create config.object for chart.js
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
    
    //if chart exists, destroy it
    if(nu_doughnut_total_chart != undefined)
        nu_doughnut_total_chart.destroy();

    //render chart
    nu_doughnut_total_chart = new Chart("nu_doughnut_total_chart", config);
}