function showSecurityPlot(){
    document.getElementById("myChart_sec").style.display = "block";
    document.getElementById("myChart_ind").style.display = "none";
    document.getElementById("sec_message").style.display = "block";
    document.getElementById("ind_message").style.display = "none";
    document.getElementById('secPlotBtn').classList.add("active");
    document.getElementById('indPlotBtn').classList.remove("active");
    showSecurityDownloadBtn();
}

function showIndustryPlot(){
    document.getElementById("myChart_sec").style.display = "none";
    document.getElementById("myChart_ind").style.display = "block";
    document.getElementById("sec_message").style.display = "none";
    document.getElementById("ind_message").style.display = "block";
    document.getElementById('secPlotBtn').classList.remove("active");
    document.getElementById('indPlotBtn').classList.add("active");
    showIndustryDownloadBtn();
}

function showSecurityDownloadBtn(){
    document.getElementById("downloadBtn").classList.add("invisible");
    document.getElementById("downloadBtn_sec").classList.remove("invisible");
    document.getElementById("downloadBtn_ind").classList.add("invisible");
}

function showIndustryDownloadBtn(){
    document.getElementById("downloadBtn").classList.add("invisible");
    document.getElementById("downloadBtn_sec").classList.add("invisible");
    document.getElementById("downloadBtn_ind").classList.remove("invisible");
}

function showDownloadBtn(){
    document.getElementById("downloadBtn").classList.remove("invisible");
    document.getElementById("downloadBtn_sec").classList.add("invisible");
    document.getElementById("downloadBtn_ind").classList.add("invisible");
}

function plotDistribution(securityWise,industryWise){
    
    var data_sec = getSortedData(securityWise);  //  data_sec = [   [secuty 1, secury 2, ... ], [amt1, amt2,...],  [per1, per2,... ] ]
    var data_ind = getSortedData(industryWise);

    exportData(transpose(data_sec),"_sec");
    exportData(transpose(data_ind),"_ind");
    //make download button visible
    showSecurityDownloadBtn();


    document.getElementById("plots").innerHTML = 
        '   <div class="btn-group" role="group" aria-label="Basic example">\
	            <button type="button" id="secPlotBtn" class="btn btn-secondary active" onclick="showSecurityPlot()">View Security wise Distribution</button>\
	            <button type="button" id="indPlotBtn" class="btn btn-secondary" onclick="showIndustryPlot()">View Industry wise Distribution</button>\
            </div>\
            <br>\
            <p id="sec_message"></p> \
            <canvas id="myChart_sec" width=100%  height=' + 3*data_sec[0].length + 'px"></canvas>\
            <p id="ind_message"></p>\
            <canvas id="myChart_ind" width=100%  height=' + 3*data_ind[0].length + 'px"></canvas>';

            document.getElementById("ind_message").style.display = "none";
            document.getElementById("myChart_ind").style.display = "none";
            
            
    // plot overview graphs

    var limit = 100;

  
    var myChart_sec = new Chart("myChart_sec", {
            type: "horizontalBar",
            data: {labels: data_sec[0].slice(0, limit),
                datasets: [{ label: 'Stockwise Distribution',
                            data:data_sec[1].slice(0, limit)}]
            },
            options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Stock wise Distribution"
                        }
                    },
                    scales: {
                        xAxes: [{
                          ticks: {
                            beginAtZero: true,
                            callback: function(tick) {
                                return "₹" + tick.toLocaleString('en-IN');
                            }
                          }
                        }]
                      }
            }

            });

    var myChart_ind = new Chart("myChart_ind", {
            type: "horizontalBar",
            data: {labels: data_ind[0].slice(0, limit),
                datasets: [{ label: 'Industrywise Distribution', data:data_ind[1].slice(0, limit) }]
            },
            options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Industry wise Distribution"
                        }
                    },
                    scales: {
                        xAxes: [{
                          ticks: {
                            beginAtZero: true,
                            callback: function(tick) {
                              return "₹" + tick.toLocaleString('en-IN');
                            }
                          }
                        }]
                      }
                }

            });

}

function plotSecuritesOverlap(securityWise){
   //V1 code when dot product and check box was used
    // plot overview graphs
    var vectors = getSortedCommonSecurity(securityWise);
    vectors = transpose(vectors);
    document.getElementById("plots").innerHTML = ' <canvas id="myChart_sec_ovelap" width=100%  height=' + 5*vectors[0].length +'px"></canvas>';

    console.log("printing final vectors");
    console.log(vectors);

    var limit = 50;
    const config = new Chart("myChart_sec_ovelap",{
                type: 'horizontalBar',
                data: {labels: vectors[0],
                    datasets: [
                        { label:"Holding in Portfolio", 
                           data: vectors[1],
                           backgroundColor:  "#ff9999"
                        },
                        { label:"Holding in Selected Fund", 
                           data: vectors[2],
                           backgroundColor:"#99c2ff"
                        }
                        
                ]
                },
                options: {
                    indexAxis: 'y',
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    },
                    scales: {
                        xAxes: [{
                          ticks: {
                            beginAtZero: true,
                            callback: function(tick) {
                              return parseInt(tick).toString() + "%";
                            }
                          }
                        }]
                      },
                      tooltips: {
                        enabled: true,
                        // mode: 'single',
                        callbacks: {
                            label: function(tooltipItems, data) { 
                                return tooltipItems.xLabel + '%';
                            }
                        }
                      }

                    }
                });



}

function plotOverlapWithPortfolio(securityWise){
   
    // plot overview graphs
    var vectors = getSortedCommonSecurity(securityWise);
    
    showDownloadBtn();
    exportData(vectors,"");
    vectors = transpose(vectors);
    document.getElementById("plots").innerHTML = ' <div id="venn" class="text-center"></div> <canvas id="myChart_sec_ovelap" width=100%  height=' + 5*vectors[0].length +'px"></canvas>';

    console.log("printing final vectors");
    console.log(vectors);

    var limit = 50;
    const config = new Chart("myChart_sec_ovelap",{
                type: 'horizontalBar',
                data: {labels: vectors[0],
                    datasets: [
                        { label:"Holding in Portfolio", 
                           data: vectors[1],
                           backgroundColor:  "#ff9999"
                        },
                        { label:"Holding in Selected Fund", 
                           data: vectors[2],
                           backgroundColor:"#99c2ff"
                        }
                        
                ]
                },
                options: {
                    indexAxis: 'y',
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    },
                    scales: {
                        xAxes: [{
                          ticks: {
                            beginAtZero: true,
                            callback: function(tick) {
                              return parseInt(tick).toString() + "%";
                            }
                          }
                        }]
                      },
                      tooltips: {
                        enabled: true,
                        // mode: 'single',
                        callbacks: {
                            label: function(tooltipItems, data) { 
                                return tooltipItems.xLabel + '%';
                            }
                        }
                      }

                    }
                });


    

}

function plotPairWiseOverlap(combinations){

    
    // console.log("printing combinations");
    // console.log(combinations);
    // plot overview graphs
    showDownloadBtn();
    exportData(combinations,"");
    var combinations = transpose(combinations);

    var height  =  10+ 5*combinations[0].length;
    document.getElementById("plots").innerHTML = '<canvas id="myChart_overlap" width=100%  height='+  height +'px"></canvas>';


    const config = new Chart("myChart_overlap",{
        type: 'horizontalBar',
        data: {labels: combinations[0],
            datasets: [{ label:"Pair wise overlap", data:combinations[1]}]
        },
        options: {
            indexAxis: 'y',
            elements: {
            bar: {
                borderWidth: 2,
            }
            },
            responsive: true,
            plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart'
            }
            },
            scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true,
                    max: 100,
                    callback: function(tick) {
                      return tick.toString() + '%';
                    }
                  }
                }]
              },
              tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) { 
                        return tooltipItems.xLabel + '%';
                    }
                }
              }
            
        },

        });



}


function plotOverlapVennDiagram(compFund,portfolioAmount,fundAmount,OverlapAmount){

    // var new_div = '<div id="venn"></div>';

    // new_div += document.getElementById("plots").innerHTML;
    // document.getElementById("plots").innerHTML = new_div;
    

    var chart = venn.VennDiagram()
                 .width(300)
                 .height(300);

var div = d3.select("#venn");

var newarea = [
         {"sets": [0], "label": "My Portolfio", "size": portfolioAmount},
         {"sets": [1], "label": compFund, "size": fundAmount},
         {"sets": [0, 1], "size": OverlapAmount}];

div.datum(newarea).call(chart);

var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");

div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 3)

div.selectAll("g")
    .on("mouseover", function(d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", .9);
        tooltip.text("₹" + d.size);

        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });

}