document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("investment-form");
    const goalContainer = document.getElementById("goal-container");
    const addGoalButton = document.getElementById("add-goal");
    let goalCount = 1;
    const goalsData = {};


    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Loop through each goal and store the data in a dictionary
        const goalElements = document.querySelectorAll(".goal");
        goalElements.forEach((goal, index) => {
            const goalName = goal.querySelector(".goal-name").value;
            const valueDate = goal.querySelector(".value-date").value;
            const withdrawalYear = goal.querySelector(".withdrawal-year").value;

            // Store the data as a dictionary object
            goalsData[`Goal ${index + 1}`] = {
                "Goal Name": goalName,
                "Value as of Date": valueDate,
                "Expected Year of Withdrawal": withdrawalYear,
            };
        });

        // Log the collected data (you can replace this with your desired action)
        console.log(goalsData);
    });


    // Roshan Manellore Logic

    //weighted average rate computation

    function getWeightedAverageReturn(allocation,expectedReturn){
        var rate = 0.0;

        for(asset in allocation){
            rate = rate + expectedReturn[asset]*allocation[asset];
        }
        
        return rate;
    }


    // derive future value
    function deriveInflationAdjustedCost(goalDict){

        for (let goal in goalDict){
            goalDict[goal].inflationAdjustedCost = goalDict[goal].ValueToday*Math.pow(1+rates.Inflation, goalDict[goal].WithdrawalYear-currentYear)
            console.log(goal);
        }
        return goalDict;
    
    }


    // generaet portfolio goal wise
    function generatePortfolio(goalDict , allocation, rates){

        const portfolio = {};

        //generate portfolio structure

    //  porfolio = {
    //         goal1 : {
    //             2021 : { SmallCap=100, midcap=100, LargeCap=100 , total= 300},
    //             2022 : { SmallCap=100, midcap=100, LargeCap=200, total = 400}
    //         },
    //         goal 2 : {

    //         }
    //     }


        const porfolioStartYear = 2023;

        for (let goal in goalDict){
            portfolio[goal]={}
            for (let yr = porfolioStartYear; yr<porfolioStartYear+50;yr++){
                portfolio[goal][yr] = {};
                    for (let asset in allocation[1]){
                        portfolio[goal][yr][asset] = 0;
                    }

            }

        }

        console.log(portfolio);


        //get the amounts required for each goal
        for (let goal in goalDict){

            const exitYear = goalDict[goal].WithdrawalYear;

            var totalAmountForPeriod = goalDict[goal].inflationAdjustedCost;

            portfolio[goal][exitYear].Total = totalAmountForPeriod;
            
            var yearsToGoal = 1;

        // loop through differnt years starting from the withdrawal year to current year
            for (let yr = goalDict[goal].WithdrawalYear; yr >= porfolioStartYear; yr--) {
                //perform allocation to different asset class
                for (asset in allocation[yearsToGoal]){
                    portfolio[goal][yr][asset]=totalAmountForPeriod*allocation[yearsToGoal][asset];
                }
            
                var weighedAvgReturn = 0.0;
                
                weighedAvgReturn = getWeightedAverageReturn(allocation[yearsToGoal],expectedReturn);

                portfolio[goal][yr].Total = totalAmountForPeriod;      

                // calculate the amounts for n-1 year based on the expectedrates           
                totalAmountForPeriod = totalAmountForPeriod / (1+weighedAvgReturn);
                
                // n-i portfolio size = n portfolio size / weighted average return of i years to goal period.

                
                // allocate it to the year n-i profolio
                yearsToGoal = yearsToGoal + 1;

                // repeat the steps until we reach the end of the current period
            }



        }

        console.log(portfolio);

    }

    const currentYear=2023;
    // const goals = {};

    // goals["Goal1"] = { "ValueToday": 400000, "WithdrawalYear": 2028 };
    // goals["Goal2"] = { "ValueToday": 30000, "WithdrawalYear": 2029 };
    // goals["Goal3"] = { "ValueToday": 40000, "WithdrawalYear": 2030 };
    // enhance this to take into account the corpos available today.

    const allocation ={};

    allocation[1]= {"SmallCap" : .1 , "MidCap": .1 , "LargeCap": .8};
    allocation[2]= {"SmallCap" : .2 , "MidCap": .1 , "LargeCap": .7};
    allocation[3]= {"SmallCap" : .3 , "MidCap": .1 , "LargeCap": .6};
    allocation[4]= {"SmallCap" : .4 , "MidCap": .1 , "LargeCap": .5};
    allocation[5]= {"SmallCap" : .5 , "MidCap": .1 , "LargeCap": .4};
    allocation[6]= {"SmallCap" : .6 , "MidCap": .1 , "LargeCap": .3};
    allocation[7]= {"SmallCap" : .7 , "MidCap": .1 , "LargeCap": .2};
    allocation[8]= {"SmallCap" : .8 , "MidCap": .1 , "LargeCap": .1};

    const expectedReturn = {};

    expectedReturn["SmallCap"] = 0.18;
    expectedReturn["MidCap"] = 0.15;
    expectedReturn["LargeCap"] = 0.12;


    const rates = {};
    rates["Inflation"] = 0.06;


    console.log(goals);
    console.log(goals["Goal3"].ValueToday);
    console.log(allocation[2].SmallCap);
    console.log(expectedReturn["SmallCap"]);

    const portfolio = {};
    portfolio[2023]= {"SmallCap" : 1000 , "MidCap": 2000 , "LargeCap": 3000};

    console.log("Print goals");
   
    // console.log(deriveInflationAdjustedCost(goals));



    // generatePortfolio(goals , allocation, rates);

});
