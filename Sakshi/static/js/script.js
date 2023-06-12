let data;
let yearSelect = document.getElementById('yearSelect');
let provinceSelect = document.getElementById('provinceSelect');
let neighbourhoodSelect = document.getElementById('neighbourhoodSelect');
let selectedYear;
let selectedProvince;
let selectedNeighbourhood;
let chartArea = document.getElementById('charts');

d3.json('rental_data.json').then(d => {
    data = d;
    initializeSelections();
});

function initializeSelections() {
    let years = [...new Set(data.map(d => d.Year))].sort();
    let provinces = [...new Set(data.map(d => d.Location.Province))].sort();
    let neighbourhoods = [...new Set(data.map(d => d.Location.Neighbourhood))].sort();

    appendOptions(yearSelect, years);
    appendOptions(provinceSelect, provinces);
    appendOptions(neighbourhoodSelect, neighbourhoods);

    updateYear();
    updateProvince();
    updateNeighbourhood();
}

function appendOptions(selectElement, optionsArray) {
    optionsArray.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option;
        opt.innerHTML = option;
        selectElement.appendChild(opt);
    });
}

function updateYear() {
    selectedYear = yearSelect.value;
    updateCharts();
}

function updateProvince() {
    selectedProvince = provinceSelect.value;
    updateCharts();
}

function updateNeighbourhood() {
    selectedNeighbourhood = neighbourhoodSelect.value;
    updateCharts();
}

function updateCharts() {
    chartArea.innerHTML = ''; // Clear old charts

    let filteredData = data.filter(d =>
        d.Year == selectedYear &&
        d.Location.Province == selectedProvince &&
        d.Location.Neighbourhood == selectedNeighbourhood
    );

    // assuming we want to visualize 'AverageRent', 'VacancyRate', and 'NumberofUnits'
    ['AverageRent', 'VacancyRate', 'NumberofUnits'].forEach(key => {
        let values = filteredData.map(d => d.RentalInformation[key]);

        // create a bar chart for each key
        createBarChart(key, values);
    });
}

function createBarChart(key, values) {
    // Implement your d3.js bar chart logic here. 
    // `key` will be the name of the bar chart. 
    // `values` will be the data array to visualize. 

    // This is a simplified placeholder implementation:
    let div = document.createElement('div');
    div.innerHTML = `<h2>${key}</h2>${JSON.stringify(values)}`;
    chartArea.appendChild(div);
}
