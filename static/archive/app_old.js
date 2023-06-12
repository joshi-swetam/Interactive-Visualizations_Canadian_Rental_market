const selProvince = d3.select("#selProvince");
const selCenter = d3.select("#selCenter");
const selZone = d3.select("#selZone");
const selNeighbourhood = d3.select("#selNeighbourhood");
const selYear = d3.select("#selYear");
const selDwellingType = d3.select("#selDwellingType");

const baseUrl = 'http://127.0.0.1:5000/api/v1.0';

d3.json(`${baseUrl}/location_filter/provinces`)
    .then(
        function(provinces)
        { 
            selProvince.append("option").text("All").property("value", "na");

            provinces.forEach((province) => {
                selProvince
                    .append("option")
                    .text(province)
                    .property("value", province);
            });

            selProvince.dispatch("change");
        });

function selProvinceChanged(selectedProvince){

    selCenter.html('');
    selZone.html('');
    selNeighbourhood.html('');

    selCenter.append("option").text("All").property("value", "na");

    if(selectedProvince != 'na')
    {
        d3.json(`${baseUrl}/location_filter/centers/${selectedProvince}`)
        .then(
            function(centers)
            { 
                centers.forEach((center) => {
                    selCenter
                        .append("option")
                        .text(center)
                        .property("value", center);
                });

                
            });
    }
    
    selCenter.dispatch("change");
}

function selCenterChanged(selectedCenter){

    selZone.html('');
    selNeighbourhood.html('');

    selZone.append("option").text("All").property("value", "na");

    if(selectedCenter != 'na')
    {
        const province = selProvince.node().value;

        d3.json(`${baseUrl}/location_filter/zones/${province}/${selectedCenter}`)
        .then(
            function(zones)
            { 
                zones.forEach((zone) => {
                    selZone
                        .append("option")
                        .text(zone)
                        .property("value", zone);
                });

                
            });
    }

    selZone.dispatch("change");
}

function selZoneChanged(selectedZone){

    selNeighbourhood.html('');

    selNeighbourhood.append("option").text("All").property("value", "na");

    if(selectedZone != 'na')
    {
        const province = selProvince.node().value;
        const center = selCenter.node().value;

        d3.json(`${baseUrl}/location_filter/neighbourhoods/${province}/${center}/${selectedZone}`)
        .then(
            function(neighbourhoods)
            { 
                neighbourhoods.forEach((neighbourhood) => {
                    selNeighbourhood
                        .append("option")
                        .text(neighbourhood)
                        .property("value", neighbourhood);
                });
            });
    }
}

d3.json(`${baseUrl}/location_filter/years`)
.then(
    function(years)
    { 
        selYear.append("option").text("All").property("value", "na");
        
        years.forEach((year) => {
            selYear
                .append("option")
                .text(year)
                .property("value", year);
        });
    });

d3.json(`${baseUrl}/location_filter/dwellingtypes`)
.then(
    function(dwellingtypes)
    { 
        selDwellingType.append("option").text("All").property("value", "na");
        
        dwellingtypes.forEach((dwellingtype) => {
            selDwellingType
                .append("option")
                .text(dwellingtype)
                .property("value", dwellingtype);
        });

        selCenter.dispatch("change");
    });

function getRentalInformation(){
    const province = selProvince.node().value;
    const center = selCenter.node().value;
    const zone = selZone.node().value;
    const neighbourhood = selNeighbourhood.node().value;
    const year = selYear.node().value;
    const dwellingType = selDwellingType.node().value;

    const url = `${baseUrl}/rental_data/${province}/${center}/${zone}/${neighbourhood}/${year}/${dwellingType}`

    d3.json(url)
    .then(
        function(rental_data)
        { 
            console.log("Filtered Rental Data");
            console.log("=====================================================");
            console.log(rental_data);
        });
}

d3.json(`${baseUrl}/province_centers`)
    .then(
        function(rental_data)
        { 
            console.log("Rental Data for Province + Centers with Geo Location");
            console.log("=====================================================");
            console.log(rental_data);
        });
