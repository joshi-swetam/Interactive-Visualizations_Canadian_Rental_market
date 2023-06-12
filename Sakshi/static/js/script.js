// populate dropdown menus and create initial plots
d3.json("/data").then(function(data) {

    let years = [...new Set(data.map(d => d.Year))];
    let provinces = [...new Set(data.map(d => d.Location.Province))];

    // populate dropdown menus
    let yearSelect = document.getElementById('yearSelect');
    let provinceSelect = document.getElementById('provinceSelect');

    years.forEach(year => {
        let option = document.createElement('option');
        option.text = year;
        option.value = year;
        yearSelect.appendChild(option);
    });

    provinces.forEach(province => {
        let option = document.createElement('option');
        option.text = province;
        option.value = province;
        provinceSelect.appendChild(option);
    });

    // create initial plots
    updatePlots(data, years[0], provinces[0]);
});

// update plots when dropdown selection changes
document.getElementById('yearSelect').addEventListener('change', updateSelection);
document.getElementById('provinceSelect').addEventListener('change', updateSelection);

// update plots based on selected year and province
function updateSelection() {
    let selectedYear = document.getElementById('yearSelect').value;
    let selectedProvince = document.getElementById('provinceSelect').value;
    
    d3.json("/data").then(function(data) {
        updatePlots(data, selectedYear, selectedProvince);
    });
}

// create/update bar plot and pie chart
function updatePlots(data, year, province) {
    let filteredData = data.filter(d => d.Year == year && d.Location.Province == province);
    
    let values = filteredData.map(d => d.RentalInformation.AverageRent);
    let labels = filteredData.map(d => d.Location.Neighbourhood);

    // update bar plot
    var trace1 = {
        x: labels,
        y: values,
        type: 'bar'
    };

    var layout1 = {
        title: `Average Rent by Neighbourhood in ${province}, ${year}`,
    };

    Plotly.newPlot('bar', [trace1], layout1);

    // update pie chart
    var trace2 = {
        values: values,
        labels: labels,
        type: 'pie'
    };

    var layout2 = {
        title: `Average Rent by Neighbourhood in ${province}, ${year}`,
    };

    Plotly.newPlot('pie', [trace2], layout2);
}
