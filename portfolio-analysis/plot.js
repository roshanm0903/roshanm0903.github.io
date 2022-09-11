function showSecurityPlot(){
    document.getElementById("myChart_sec").style.display = "block";
    document.getElementById("myChart_ind").style.display = "none";
    document.getElementById("sec_message").style.display = "block";
    document.getElementById("ind_message").style.display = "none";
    document.getElementById('secPlotBtn').classList.add("active");
    document.getElementById('indPlotBtn').classList.remove("active");
}

function showIndustryPlot(){
    document.getElementById("myChart_sec").style.display = "none";
    document.getElementById("myChart_ind").style.display = "block";
    document.getElementById("sec_message").style.display = "none";
    document.getElementById("ind_message").style.display = "block";
    document.getElementById('secPlotBtn').classList.remove("active");
    document.getElementById('indPlotBtn').classList.add("active");
}

function plotDistribution(securityWise,industryWise){
    
    var data_sec = getSortedData(securityWise);  //  data_sec = [   [secuty 1, secury 2, ... ], [amt1, amt2,...],  [per1, per2,... ] ]
    var data_ind = getSortedData(industryWise);

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

function plotPairWiseOverlap(combinations){

    
    // console.log("printing combinations");
    // console.log(combinations);
    // plot overview graphs
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