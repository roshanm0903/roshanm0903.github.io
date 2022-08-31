function plot(securityWise,industryWise){
    document.getElementById("plots").innerHTML = ' <canvas id="myChart_sec" style="width:100%;"></canvas> \
            <canvas id="myChart_ind" style="width:100%;"></canvas>';

    // plot overview graphs

    var limit = 30;
    var data_sec = getSortedData(securityWise);  //  data_sec = [   [secuty 1, secury 2, ... ], [amt1, amt2,...],  [per1, per2,... ] ]
    var myChart_sec = new Chart("myChart_sec", {
            type: "bar",
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
                    }
                }

            });

    var data_ind = getSortedData(industryWise);
    var myChart_ind = new Chart("myChart_ind", {
            type: "bar",
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
                    }
                }

            });




}

function plotSecuritesOverlap(securityWise){
    document.getElementById("plots").innerHTML = ' <canvas id="myChart_sec_ovelap" width=100%  height=1000"></canvas>';

    // plot overview graphs
    var vectors = getSortedCommonSecurity(securityWise);
    vectors = transpose(vectors);
    console.log("printing final vectors");
    console.log(vectors);

    var limit = 50;
    const config = new Chart("myChart_sec_ovelap",{
                type: 'horizontalBar',
                data: {labels: vectors[0],
                    datasets: [
                        { label:"Holding in Portfolio", 
                           data:vectors[2],
                           backgroundColor:  "#ff9999"
                        },
                        { label:"Holding in Selected Fund", 
                           data:vectors[3],
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
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Horizontal Bar Chart'
                    }
                    }
                },
                });



}

function plotPairWiseOverlap(combinations){
    document.getElementById("plots").innerHTML = '<canvas id="myChart_overlap" style="width:100%;max-width:700px"></canvas>';

    // console.log("printing combinations");
    // console.log(combinations);
    // plot overview graphs
    var combinations = transpose(combinations);



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
                    callback: function(tick) {
                      return tick.toString() + '%';
                    }
                  }
                }]
              }
            
        },

        });



}