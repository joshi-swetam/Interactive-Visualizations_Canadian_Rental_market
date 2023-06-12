let yearSelect = document.getElementById('yearSelect');
let provinceSelect = document.getElementById('provinceSelect');
let neighborhoodSelect = document.getElementById('neighborhoodSelect');

d3.json("/data").then(function(data) {
    let years = [...new Set(data.map(d => d.Year))]; 
    let provinces = [...new Set(data.map(d => d.Location.Province))];
    let neighborhoods = [...new Set(data.map(d => d.Location.Neighborhood))];

    years.forEach(year => populateSelectBox(yearSelect, year));
    provinces.forEach(province => populateSelectBox(provinceSelect, province));
    neighborhoods.forEach(neighborhood => populateSelectBox(neighborhoodSelect, neighborhood));

    // Initial draw
    drawCharts(data, yearSelect.value, provinceSelect.value, neighborhoodSelect.value);

    // Redraw charts when selected year, province, or neighborhood changes
    yearSelect.addEventListener('change', function() {
        drawCharts(data, this.value, provinceSelect.value, neighborhoodSelect.value);
    });

    provinceSelect.addEventListener('change', function() {
        drawCharts(data, yearSelect.value, this.value, neighborhoodSelect.value);
    });

    neighborhoodSelect.addEventListener('change', function() {
        drawCharts(data, yearSelect.value, provinceSelect.value, this.value);
    });
});

function populateSelectBox(selectBox, value) {
    let option = document.createElement('option');
    option.value = value;
    option.text = value;
    selectBox.appendChild(option);
}

function drawCharts(data, year, province, neighborhood) {
    let filteredData = data.filter(d => d.Year == year && d.Location.Province == province && d.Location.Neighborhood == neighborhood);
    let values = filteredData.map(d => d.RentalInformation.AverageRent.Total);  
    let labels = filteredData.map(d => d.Location.Neighborhood);   

    // Bar Plot
    var trace1 = {
        x: labels,
        y: values,
        type: 'bar'
    };

    var layout1 = {
        title: 'Average Rent by Neighborhood (' + year + ', ' + province + ', ' + neighborhood + ')',
    };

    Plotly.newPlot('bar', [trace1], layout1);

    // Pie Chart
    var trace2 = {
        values: values,
        labels: labels,
        type: 'pie'
    };

    var layout2 = {
        title: 'Average Rent by Neighborhood (' + year + ', ' + province + ', ' + neighborhood + ')',
    };

    Plotly.newPlot('pie', [trace2], layout2);
}
