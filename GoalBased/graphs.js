function plotgraph(goals) {
console.log("Inside the plot funciton");
console.log(goals);


//creating divs for plotting the graphs
var newGraph ='';

for (let goal in goals){

    newGraph += '<div style=" margin: 0 auto;">';
    newGraph += '<canvas id="' + goal+'"></canvas>';
    newGraph += '</div>';
    // $("table").append(newRow);
    
}
document.getElementById("plots").innerHTML = newGraph;
  
  // Create charts for each goal
  for (let goal in goals){
    if(goal != "AllGoals"){
      createStackedBarChart(goals,goal); 
    }
    
  }

}

function extractYears(portfolio) {
  const yearsSet = new Set();

  // Iterate through each goal
  Object.keys(portfolio).forEach(goal => {
    // Check if "Deby" is present and not zero in any year for the current goal
    Object.keys(portfolio[goal]).forEach(year => {
      if (portfolio[goal][year]["Debt"] !== 0) {
        yearsSet.add(year);
      }
    });
  });

  // Convert the Set to an array and sort it
  const years = Array.from(yearsSet).sort();

  return years;
}



function plotAllGoals(portfolio){
  console.log("Inside the plotAllGoals");
  console.log(portfolio);

  var newGraph ='';
  newGraph += '<div style=" margin: 0 auto;">';
  newGraph += '<canvas id="portfolioChart"></canvas>';
  newGraph += '</div>';
  document.getElementById("plots").innerHTML = newGraph;

  const goalLabels = Object.keys(portfolio);
  // const years = Object.keys(portfolio[goalLabels[0]]); // Assuming the first goal contains all years
  const years = extractYears(portfolio);
   
  // const goalLabels = Object.keys(portfolio);

  // Create datasets dynamically based on goal data
  const datasets = goalLabels.map((goalLabel, index) => {
      const goalData = portfolio[goalLabel];
      const data = years.map(year => goalData[year].Total);
      const backgroundColor = datasetColors[index % datasetColors.length]; // Use a predefined color
      return {
      label: goalLabel,
      data: data,
      backgroundColor: backgroundColor,
      stack: 'Stack 0'
      };
  });


      // Create a new Chart.js chart
      const ctx = document.getElementById('portfolioChart').getContext('2d');

      new Chart(ctx, {
      type: 'bar',
      data: {
          labels: years,
          datasets: datasets
      },
      options: {
          scales: {
          x: {
              stacked: true
          },ticks: {
            autoSkip: true,
          },  
          y: {
              stacked: true
          }
          },
          plugins: {
          legend: {
              display: true,
              position: 'top'
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: 'black',
            rotation: '-90',

            // display: 'auto',
            formatter: function (value, context) {
                const datasetArray =[];
                console.log(context.chart.data);

                context.chart.data.datasets.forEach((dataset) => {
                  // console.log(dataset);
                  if(dataset.data[context.dataIndex] != undefined){
                    datasetArray.push(dataset.data[context.dataIndex]);
                  }
                });
                // console.log("Printintg dataset Array")
                // console.log(datasetArray);

                function totalSum(total,datapoint){
                  return total + datapoint;
                }
                let sum = datasetArray.reduce(totalSum,0);

                if(context.datasetIndex === datasetArray.length-1){
                  return formatter.format(sum);
                }else{
                  return '';
                }

              } 
            
            }
          }
        },
        plugins: [ChartDataLabels]

        
      });


}


// Define a set of nice colors for the datasets
const datasetColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(75, 102, 152, 0.7)',
    'rgba(120, 12, 12, 0.7)',
    'rgba(25, 200, 192, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(20, 132, 192, 0.7)',
    
    // Add more colors as needed
  ];



// Sample data
// Function to get the sum of total values for each year
function getTotalValuesForYear(year) {
    let total = 0;
    for (const goalLabel of goalLabels) {
      total += portfolio[goalLabel][year].Total;
    }
    return total;
  }


// create divs for each goal
//call plotting function


 // Helper function to assign colors to categories
 function getCategoryColor(category) {
    const colors = {
      // SmallCap: 'rgba(255, 99, 132, 0.7)',
      // Midcap: 'rgba(54, 162, 235, 0.7)',
      Investment: 'rgba(54, 12, 35, 0.7)',
      // LargeCap: 'rgba(75, 192, 192, 0.7)',
      Equity: 'rgba(75, 192, 192, 0.7)',
      Debt: 'rgba(120, 132, 192, 0.7)',
      Gold: 'rgba(40, 102, 192, 0.7)',
      RealEstate: 'rgba(70, 122, 192, 0.7)',
      Crypto: 'rgba(75, 102, 152, 0.7)',
      Total: 'rgba(255, 206, 86, 0.7)',

    };
    return colors[category];
  }

  // Function to transform data for the chart
  function transformDataForChart(portfolio, goal, excludedCategories = []) {
    // const labels = Object.keys(portfolio[goal]);
    const labels = Object.keys(portfolio[goal]).filter(year => !isNaN(portfolio[goal][year].CurrentSavingsValue));
    const datasets = Object.keys(portfolio[goal][labels[0]])
        .filter(category => !excludedCategories.includes(category)) // Exclude specified categories
        .map(category => {
          const data = labels.map(year => portfolio[goal][year][category]);

      // Round each data point to 0 decimal places
      const roundedData = data.map(value => Math.round(value));

            if (category === 'Investment') {
                // Use line chart for the "Investment" dataset
                //                 const dataPoints = labels.map(year => portfolio[goal][year][category]);
                // // Filter out null values
                // const filteredDataPoints = dataPoints.filter(value => value !== null && !isNaN(value));
                return {
                    label: category,
                    data: roundedData,
                    // fill: false,
                    // borderColor: getCategoryColor(category),
                    yAxisID: 'y2', // Assign to secondary axis
                    type: 'line'
                };
            } else if(category === 'CurrentSavingsValue'){
              return{label: category,
                data: roundedData,
                // backgroundColor: getCategoryColor(category),
                borderColor: 'rgba(255, 0, 0,0.3)',
                yAxisID: 'y1', // Assign to primay axis
                fill : false,
                type: 'line'
              };

            }else if(category === 'GoalAmountatExit'){
              return{label: category,
                data: roundedData,
                backgroundColor: 'rgba(255, 0, 0,0.8)',
                // borderColor: 'rgba(255, 0, 0,0.8)',
                yAxisID: 'y1', // Assign to primay axis
                fill : false,
              };

            }

            else {
                // Use bar chart for other datasets
                return {
                    label: category,
                    data: roundedData,
                    backgroundColor: getCategoryColor(category),
                    yAxisID: 'y1', // Assign to primay axis
              

                };
            }
        });

    return { labels, datasets };
}


// Function to create a stacked bar chart
function createStackedBarChart(portfolio, goal) {
  const data = transformDataForChart(portfolio, goal, ['ExpectedReturn','Total']);
  console.log("the dataset is as follows");
  console.log (data);

  const ctx = document.getElementById(`${goal}`).getContext('2d');

  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: data.labels,
          datasets: data.datasets,
      },
      options: {
          scales: {
              x: {
                  stacked: true,
              },
              y1: {
                  stacked: true,
                  position: 'left'
              },
              y2:{
                type: 'linear',
                position: 'right',
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                }
              }
              
          }, 
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
              legend: {
                  display: true, // Display the legend
                  position: 'top', // Position of the legend
              },
              title: {
                  display: true,
                  // text: `${goal}`,
                  text: 'Asset allocation to meet the goal - ' + `${goal}`,
              },
              tooltip: {
                callbacks: {
                  footer: footer,
                }
              }
          },
          
      },
  });
}

const footer = (tooltipItems) => {
  let sum = 0;


  tooltipItems.forEach(function(tooltipItem) {  
    console.log("Inside tooltipItem : ");
    console.log(tooltipItem);
    if (tooltipItem.dataset.label != 'CurrentSavingsValue'){
      sum += tooltipItem.parsed.y;
    }
    
  });
  return 'Portfolio Total: ' + formatter.format(sum);
};