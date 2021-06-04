//Use d3 library to read in samples
function getPlots(id) {
    d3.json("samples.json").then (sampledata=>{
        console.log(sampledata)
        var ids=sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

        // top 10 OTUs
        var otu_top = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
        //grab OTUs 
        var otu_id = otu_top.map(d => "OTU" + d);
        console.log(`OTU IDS: ${otu_id}`)

        //top 10 for bar graph
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            type: "bar",
            x: sampleValues,
            y: otu_id,
            orientation: "h",
        };
        // data variable 
        var data = [trace];

        var layout={
            title: "Top 10 Bacteria Cultures Found", 
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                r:75, 
                t:50,
                l:75,
                b:25
            }
        };
        Plotly.newPlot("bar", data, layout);

        //NEXT CHART Circle  
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                color: sampledata.samples[0].otu_ids, 
                size: sampledata.samples[0].sample_values
            },
            text:  sampledata.samples[0].otu_labels

        };

        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 450,
            width: 1200,
        };

        // data variable 
        var data1 = [trace1];
    Plotly.newPlot("bubble", data1,layout_2); 
    
    });
}  

function getDemoInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;

        console.log(metadata)

       var result = metadata.filter(meta => meta.id.toString() === id)[0];
       var demographicInfo = d3.select("#sample-metadata");
       demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getDemoInfo(data.names[0]);
        getPlots(data.names[0]);
    });
}
init();