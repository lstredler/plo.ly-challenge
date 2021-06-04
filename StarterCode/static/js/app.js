function getPlots(id) {
    d3.json("samples.json").then (sampledata=>{
        console.log(sampledata)
        var ids=sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

        // top 10 OTUs ids 
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
        //retrieve OTUs 
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)

        //get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        var layout={
            title: "Top 10 OTU", 
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r:100,
                t:100,
                b:30
            }
        };
        // bar plot
        Plotly.newPlot("bar", data, layout);
        // bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // layout bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // data variable 
        var data1 = [trace1];

    // create bubble plot 
    Plotly.newPlot("bubble", data1, layout_2); 
    
    });
}  

function getDemoInfo(id) {
// read json file 
    d3.json("samples.json").then((data)=> {
//  metadata for demographic panel
        var metadata = data.metadata;

        console.log(metadata)

      // filter by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // select demo panel
       var demographicInfo = d3.select("#sample-metadata");
        
     // empty demo panel 
       demographicInfo.html("");

     // grab demo data, append to panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
// create change event function 
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// create initial data rendering function 
function init() {
    // dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // id data to dropdown menu 
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // display data and plots to page 
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();