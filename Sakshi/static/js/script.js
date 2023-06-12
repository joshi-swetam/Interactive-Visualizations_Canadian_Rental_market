d3.json("/data").then(function(data) {
    // Extract data for plotting
    
    let values = data.map(d => d.AverageRent);  
    let labels = data.map(d => d.Province);   

    // Create a bar plot
    var trace1 = {
        x: labels,
        y: values,
        type: 'bar'
    };

    var layout1 = {
        title: 'Bar Plot',
    };

    Plotly.newPlot('bar', [trace1], layout1);

    // Create a pie chart
    var trace2 = {
        values: values,
        labels: labels,
        type: 'pie'
    };

    var layout2 = {
        title: 'Pie Chart',
    };

    Plotly.newPlot('pie', [trace2], layout2);
});
