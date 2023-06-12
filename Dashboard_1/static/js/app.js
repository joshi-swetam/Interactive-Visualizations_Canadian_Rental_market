// get the url
const url = "data_2022.json"

let Years = [2018,2019,2020,2021,2022];

function sample_plot(province){
  rent_array = [];
  centres_array = [];
  vacancy_array = [] ;
  units_array = [];
  d3.json(url).then(function(data) {
          console.log(data); 
          console.log(data[0]);
          console.log(data[1]);
          
        
          var province_array = data[1][0].filter((name => name.Province == province));
          console.log(province_array);
          for (i = 0 ; i < province_array.length ; i ++){
            rent_array.push(province_array[i].AverageRent);
            centres_array.push(province_array[i].Centres);
            units_array.push(province_array[i].Units);
          }
          console.log(rent_array,centres_array,units_array);
        // build a bar chart 
// take help from plotly examples for plotting
      var trace_bar = [
          {
          x : centres_array, 
          y : rent_array,
          type : "bar",
          marker: {
              color: 'DE738F',
              width: 10
            },
        }
      ];
      var bar_Layout = {
          title: {text : `<b>Average Rents</b>`,font: { size: 24 }},
      };
      Plotly.newPlot("bar", trace_bar, bar_Layout);

    // pie chart

      var pie_data = [
        {
        values : units_array,
        labels : centres_array,
        type : "pie"
      }];

      var pie_layout = {
        title: {text : `<b> Units </b>`,font: { size: 24 }},

      }
      Plotly.newPlot("pie",pie_data,pie_layout);
  });
};

// function for selection
function init() {
     var dropdownbutton = d3.select("#selDataset");
     d3.json(url).then((data) => {
        var provinceNames = data[0]; 
        // perform loop on all the names based on the selection , . property will get the corresponding id name
        provinceNames.forEach((province) => {
            dropdownbutton
            .append("option")
            .text(province)
            .property("value", province);
        });
        // initialize the dashboard and assign them to the functions created earlier
      const default_province = provinceNames[0];
      sample_plot(default_province);
        // sample_Metadata(default_Sample);
});
// function to change the plots based on the selection
}
// option changed 
function optionChanged(next_province) {
    sample_plot(next_province);
    //  sample_Metadata(next_Sample);
    }
  init();
