//Use d3 library to read in samples data //
function getPlots(id) {
    d3.json("samples.json").then (samples_data=>{
        console.log(samples_data)
        var otu_ids=samples_data.samples[0].otu_ids;
        console.log(otu_ids)
        var sample_values =  samples_data.samples[0].sample_values.slice(0,10).reverse();
        console.log(sample_values)
        var otu_labels =  samples_data.samples[0].otu_labels.slice(0,10);
        console.log (otu_labels)

        // add top 10 OTUs constraint/specification //
        var otu_top = (samples_data.samples[0].otu_ids.slice(0, 10)).reverse();
        
        //grab the otu data  //
        var otu_id = otu_top.map(d => "OTU" + d);
        console.log(`otu_ids: ${otu_id}`)

        //BAR CHART //
        var otu_labels =  samples_data.samples[0].otu_labels.slice(0,10);
        console.log(`otu_labels: ${otu_labels}`)
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: sample_values,
            y: otu_id,
        };
        // data variable //
        var data1 = [trace1];

        var layout1={
            title: "Top 10 Bacteria Cultures Found", 
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                r:75, 
                t:55,
                l:75,
                b:25
            }
        };
        Plotly.newPlot("bar", data1, layout1);

        //NEXT CHART Bubble //
        var trace2 = {
            type: "bubble",
            x: samples_data.samples[0].otu_ids,
            y: samples_data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: samples_data.samples[0].sample_values,
                color: samples_data.samples[0].otu_ids
            },
            text: samples_data.samples[0].otu_labels

        };
        //bubble chart layout//
        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xaxis:{title: "OTU ID"},
            height: 550,
            width: 1200,
        };

        // data variable 
        var data2 = [trace2];
    Plotly.newPlot("bubble", data2,layout2); 
    
    });
}  

function getDemoInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html(" ");
        Object.entries(result).forEach((key) => {   
            demoInfo.append("h6").text(key[0]+ ": " + key[1]);    
        });
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dropdownMenu = d3.selectAll("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");
        });

        getDemoInfo(data.names[0]);
        getPlots(data.names[0]);
    });
}
init();
