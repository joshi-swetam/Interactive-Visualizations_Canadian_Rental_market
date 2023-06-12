d3.json("/data").then(function(data) {

    let dropdownYear = d3.select("#dropdownYear");
    let dropdownProvince = d3.select("#dropdownProvince");
    let dropdownNeighbourhood = d3.select("#dropdownNeighbourhood");

    let years = [...new Set(data.map(d => d.Year))];
    let provinces = [...new Set(data.map(d => d.Location.Province))];
    let neighbourhoods = [...new Set(data.map(d => d.Location.Neighbourhood))];

    years.forEach(year => dropdownYear.append("option").text(year));
    provinces.forEach(province => dropdownProvince.append("option").text(province));
    neighbourhoods.forEach(neighbourhood => dropdownNeighbourhood.append("option").text(neighbourhood));

    function updateCharts() {
        let selectedYear = dropdownYear.property("value");
        let selectedProvince = dropdownProvince.property("value");
        let selectedNeighbourhood = dropdownNeighbourhood.property("value");

        let filteredData = data.filter(d => d.Year == selectedYear && d.Location.Province == selectedProvince && d.Location.Neighbourhood == selectedNeighbourhood);

        let averageRents = filteredData.map(d => d.RentalInformation.AverageRent.Total);
        let vacancyRates = filteredData.map(d => d.RentalInformation.VacancyRate.Total);
        let labels = filteredData.map(d => d.Location.Center);

        var trace1 = {
            x: labels,
            y: averageRents,
            type: 'bar',
            name: 'Average Rent',
            marker: {
                color: 'rgb(55, 83, 109)'
            }
        };

        var trace2 = {
            x: labels,
            y: vacancyRates,
            type: 'bar',
            name: 'Vacancy Rate',
            marker: {
                color: 'rgb(26, 118, 255)'
            }
        };

        var layout = {
            title: 'Average Rent and Vacancy Rate by City',
            barmode: 'group'
        };

        Plotly.newPlot('bar', [trace1, trace2], layout);

        var trace3 = {
            values: averageRents,
            labels: labels,
            type: 'pie',
            name: 'Average Rent',
            marker: {
                colors: ['rgb(67,67,67)', 'rgb(115,115,115)', 'rgb(49,130,189)', 'rgb(189,189,189)']
            }
        };

        var trace4 = {
            values: vacancyRates,
            labels: labels,
            type: 'pie',
            name: 'Vacancy Rate',
            marker: {
                colors: ['rgb(67,67,67)', 'rgb(115,115,115)', 'rgb(49,130,189)', 'rgb(189,189,189)']
            }
        };

        var layoutPie = {
            title: 'Average Rent and Vacancy Rate by City',
        };

        Plotly.newPlot('pie1', [trace3], layoutPie);
        Plotly.newPlot('pie2', [trace4], layoutPie);
    }

    dropdownYear.on("change", updateCharts);
    dropdownProvince.on("change", updateCharts);
    dropdownNeighbourhood.on("change", updateCharts);

    updateCharts();
});
