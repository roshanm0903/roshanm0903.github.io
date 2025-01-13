    ///constants
    const currentYear=2023;
    const porfolioStartYear = 2023;
    const NumberofFutureYears = 40;
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'long',
      })
      
    const rates = {};
    rates["Inflation"] = 0.06;
    rates["StepUp"] = 0.05;


    const allocation ={};

    // allocation[1]={SmallCap:0,MidCap:0,LargeCap:0,Debt:1,Gold:0,RealEstate:0,Crypto:0};
    // allocation[2]={SmallCap:0,MidCap:0,LargeCap:0.1,Debt:0.9,Gold:0,RealEstate:0,Crypto:0};
    // allocation[3]={SmallCap:0,MidCap:0,LargeCap:0.15,Debt:0.85,Gold:0,RealEstate:0,Crypto:0};
    // allocation[4]={SmallCap:0,MidCap:0,LargeCap:0.15,Debt:0.8,Gold:0.05,RealEstate:0,Crypto:0};
    // allocation[5]={SmallCap:0.05,MidCap:0,LargeCap:0.25,Debt:0.65,Gold:0.05,RealEstate:0,Crypto:0};
    // allocation[6]={SmallCap:0.1,MidCap:0.05,LargeCap:0.25,Debt:0.55,Gold:0.05,RealEstate:0,Crypto:0};
    // allocation[7]={SmallCap:0.1,MidCap:0.05,LargeCap:0.3,Debt:0.5,Gold:0.05,RealEstate:0,Crypto:0};
    // allocation[8]={SmallCap:0.1,MidCap:0.1,LargeCap:0.4,Debt:0.35,Gold:0.05,RealEstate:0,Crypto:0};
    // allocation[9]={SmallCap:0.15,MidCap:0.15,LargeCap:0.4,Debt:0.25,Gold:0.05,RealEstate:0,Crypto:0};
    // allocation[10]={SmallCap:0.2,MidCap:0.2,LargeCap:0.35,Debt:0.18,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[11]={SmallCap:0.2,MidCap:0.2,LargeCap:0.35,Debt:0.18,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[12]={SmallCap:0.2,MidCap:0.2,LargeCap:0.35,Debt:0.18,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[13]={SmallCap:0.2,MidCap:0.2,LargeCap:0.35,Debt:0.18,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[14]={SmallCap:0.2,MidCap:0.2,LargeCap:0.35,Debt:0.18,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[15]={SmallCap:0.2,MidCap:0.2,LargeCap:0.35,Debt:0.18,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[16]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[17]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[18]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[19]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[20]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[21]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[22]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[23]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[24]={SmallCap:0.25,MidCap:0.2,LargeCap:0.35,Debt:0.13,Gold:0.05,RealEstate:0,Crypto:0.02};
    // allocation[25]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[26]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[27]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[28]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[29]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[30]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[31]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[32]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[33]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[34]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};
    // allocation[35]={SmallCap:0.23,MidCap:0.1,LargeCap:0.2,Debt:0.1,Gold:0.05,RealEstate:0.3,Crypto:0.02};

    allocation[1]={Equity:0,Debt:1,Gold:0,RealEstate:0};
allocation[2]={Equity:0.1,Debt:0.9,Gold:0,RealEstate:0};
allocation[3]={Equity:0.15,Debt:0.85,Gold:0,RealEstate:0};
allocation[4]={Equity:0.2,Debt:0.8,Gold:0,RealEstate:0};
allocation[5]={Equity:0.3,Debt:0.65,Gold:0.05,RealEstate:0};
allocation[6]={Equity:0.4,Debt:0.55,Gold:0.05,RealEstate:0};
allocation[7]={Equity:0.45,Debt:0.5,Gold:0.05,RealEstate:0};
allocation[8]={Equity:0.6,Debt:0.35,Gold:0.05,RealEstate:0};
allocation[9]={Equity:0.7,Debt:0.25,Gold:0.05,RealEstate:0};
allocation[10]={Equity:0.77,Debt:0.18,Gold:0.05,RealEstate:0};
allocation[11]={Equity:0.77,Debt:0.18,Gold:0.05,RealEstate:0};
allocation[12]={Equity:0.77,Debt:0.18,Gold:0.05,RealEstate:0};
allocation[13]={Equity:0.77,Debt:0.18,Gold:0.05,RealEstate:0};
allocation[14]={Equity:0.77,Debt:0.18,Gold:0.05,RealEstate:0};
allocation[15]={Equity:0.77,Debt:0.18,Gold:0.05,RealEstate:0};
allocation[16]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[17]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[18]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[19]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[20]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[21]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[22]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[23]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[24]={Equity:0.82,Debt:0.13,Gold:0.05,RealEstate:0};
allocation[25]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[26]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[27]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[28]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[29]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[30]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[31]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[32]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[33]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[34]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};
allocation[35]={Equity:0.55,Debt:0.1,Gold:0.05,RealEstate:0.3};




    const expectedReturn = {};
    // expectedReturn['SmallCap']=0.18;
    // expectedReturn['MidCap']=0.15;
    // expectedReturn['LargeCap']=0.12;
    // expectedReturn['Debt']=0.07;
    // expectedReturn['Gold']=0.1;
    // expectedReturn['RealEstate']=0.12;
    // expectedReturn['Crypto']=0.25;


    expectedReturn["Equity"] = 0.12;
    expectedReturn["Debt"] = 0.07;
    expectedReturn["Gold"] = 0.08;
    expectedReturn["RealEstate"]= 0.10;
    
    // derive future value
    function deriveInflationAdjustedCost(goalDict){
        
        for (let goal in goalDict){
            goalDict[goal].inflationAdjustedCost = goalDict[goal].ValueToday*Math.pow(1+rates.Inflation, goalDict[goal].WithdrawalYear-currentYear);
            
            
            if ( goalDict[goal].CurrentSavings != null){
                var futureValueofCurrentSavings = goalDict[goal].CurrentSavings;
                // find the future value of the current investment, and subtract it from the adjusted cost.
                var yearsToGoal = goalDict[goal].WithdrawalYear-porfolioStartYear;
                for ( yearsToGoal; yearsToGoal>0; yearsToGoal--){
                    futureValueofCurrentSavings = futureValueofCurrentSavings*(1+getWeightedAverageReturn(allocation[yearsToGoal],expectedReturn));
                }

                goalDict[goal].inflationAdjustedCost = goalDict[goal].inflationAdjustedCost - futureValueofCurrentSavings;
            }
            console.log(" The inflation adjusted cost is :")
            console.log(goal);
        }
        return goalDict;
    }

     //weighted average rate computation

    function getWeightedAverageReturn(allocation,expectedReturn){
        var rate = 0.0;

        for(asset in allocation){
            rate = rate + expectedReturn[asset]*allocation[asset];
        }
        return rate;
    }


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

        for (let goal in goalDict){
            portfolio[goal]={}
            for (let yr = porfolioStartYear; yr<porfolioStartYear+NumberofFutureYears;yr++){
                portfolio[goal][yr] = {};
                    for (let asset in allocation[1]){
                        portfolio[goal][yr][asset] = 0;
                    }

            }

        }


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
                // n-i portfolio size = n portfolio size / weighted average return of i years to goal period.
                totalAmountForPeriod = totalAmountForPeriod / (1+weighedAvgReturn);

                // allocate it to the year n-i profolio
                yearsToGoal = yearsToGoal + 1;
                // repeat the steps until we reach the end of the current period
            }
        }

        // console.log(portfolio);
        const allGoals = {};

        // Iterate through each goal
        for (const goalName in portfolio) {
          const goalData = portfolio[goalName];
      
          // Iterate through each year within the goal
          for (const year in goalData) {
            const yearData = goalData[year];
      
            // Initialize the "AllGoals" goal if it doesn't exist
            if (!allGoals[year]) {
              allGoals[year] = {};
            }
      
            // Iterate through each category (SmallCap, midcap, LargeCap)
            for (const category in yearData) {
              if (category !== 'total') {
                // Add the category value to the "AllGoals" goal
                if (!allGoals[year][category]) {
                  allGoals[year][category] = 0;
                }
                allGoals[year][category] += yearData[category];
              }
            }
          }
        }

        portfolio["AllGoals"]=allGoals;
        return(portfolio);

    }



    // calculate yearly investment amount

    function calculateYearlyInvestment(goalDict , allocation, rates){
        console.log("Inside the SIP amount function");

        const portfolio = {};

        //generate portfolio structure

    //  porfolio = {
    //         goal1 : {
    //             2021 : { SmallCap=100, midcap=100, LargeCap=100 , total= 300 , ExpectedReturn = 0.13, },
    //             2022 : { SmallCap=100, midcap=100, LargeCap=200, total = 400, ExpectedReturn = 0.12}
    //         },
    //         goal 2 : {

    //         }
    //     }

        const porfolioStartYear = 2023;

        for (let goal in goalDict){
            portfolio[goal]={};
            for (let yr = porfolioStartYear; yr<porfolioStartYear+NumberofFutureYears;yr++){
                portfolio[goal][yr] = {};
                    for (let asset in allocation[1]){
                        portfolio[goal][yr][asset] = 0;
                    }
                portfolio[goal][yr]["Investment"] = Number.NaN;
                portfolio[goal][yr]["GoalAmountatExit"] = Number.NaN;
            }
        }

        //get the amounts required for each goal
        for (let goal in goalDict){

            const exitYear = goalDict[goal].WithdrawalYear;
            var totalAmountForPeriod = goalDict[goal].inflationAdjustedCost;
            portfolio[goal][exitYear].Total = totalAmountForPeriod; // total doesnt include current savings
            
            var yearsToGoal = 1;

        // loop through differnt years starting from the withdrawal year to current year
            for (let yr = exitYear-1; yr >= porfolioStartYear; yr--) {
            //get the expected weighted average return across differnt periods from the current year to the target goal year.
                portfolio[goal][yr].ExpectedReturn =  getWeightedAverageReturn(allocation[yearsToGoal],expectedReturn);
                yearsToGoal++;
            }
        
                    // use goal seek to get the yearly investment amount.
            var MaturityAmt = 0;
            var investmentAmt = 1000.0;
            while (MaturityAmt <= totalAmountForPeriod) {
                // console.log("Maturity Amount is "+ MaturityAmt);
                // find the maturity period, based on the yearly investment amount and expected returns.

                portfolio[goal][porfolioStartYear].Total = investmentAmt;
                let yr = porfolioStartYear + 1;
                for (yr; yr <= exitYear; yr++) {
                    //get the expected weighted average return across differnt periods from the current year to the target goal year.
                        portfolio[goal][yr].Total = investmentAmt*Math.pow(1+rates.StepUp, yr-currentYear) + portfolio[goal][yr-1].Total*(1+portfolio[goal][yr-1].ExpectedReturn);
                        portfolio[goal][yr-1].Investment = investmentAmt*Math.pow(1+rates.StepUp, yr-1-currentYear);
                    }
                    investmentAmt += 1000.0 ;
                    MaturityAmt = portfolio[goal][yr-1].Total;

            } 

            // portfolio amount including current investment amount
            yr = porfolioStartYear;
            portfolio[goal][yr].CurrentSavingsValue = parseInt(goalDict[goal].CurrentSavings);

            yr = yr+1;
            for(yr ; yr <= exitYear; yr++){
                portfolio[goal][yr].CurrentSavingsValue = portfolio[goal][yr-1].CurrentSavingsValue*(1+portfolio[goal][yr-1].ExpectedReturn);
            }



        // allocate funds across assets
    
            for(yr = porfolioStartYear ; yr <= exitYear; yr++){
                yearsToGoal = exitYear - yr;
                for (asset in allocation[yearsToGoal]){
                        portfolio[goal][yr][asset] = (portfolio[goal][yr].CurrentSavingsValue + portfolio[goal][yr].Total)*allocation[yearsToGoal][asset];
                      }
            }

        // set the value of goal amount at exit
            portfolio[goal][exitYear].GoalAmountatExit = (portfolio[goal][exitYear-1].CurrentSavingsValue + portfolio[goal][exitYear-1].Total)*(1+getWeightedAverageReturn(allocation[1],expectedReturn));


            //messaging
            document.getElementById("message").innerHTML = '';
            document.getElementById("message").innerHTML += "<br><br>Considering inflation of <b>";
            document.getElementById("message").innerHTML += rates['Inflation']*100;
            document.getElementById("message").innerHTML += "</b>% you will need <b>";
            document.getElementById("message").innerHTML += formatter.format(goalDict[goal].inflationAdjustedCost + portfolio[goal][exitYear].CurrentSavingsValue);
            document.getElementById("message").innerHTML += "</b> in the year <b>";
            document.getElementById("message").innerHTML += exitYear;
            document.getElementById("message").innerHTML += "</b> for <b>";
            document.getElementById("message").innerHTML += goal;
            document.getElementById("message").innerHTML += "</b>.<br><br>";

            document.getElementById("message").innerHTML += "To meet the goal you need to invest ";
            document.getElementById("message").innerHTML += formatter.format(portfolio[goal][porfolioStartYear].Investment);
            document.getElementById("message").innerHTML += " in the current year and increase it by ";
            document.getElementById("message").innerHTML += rates["StepUp"]*100;
            document.getElementById("message").innerHTML += "% every year till the goal is met.";

                        // <!-- To meet this goal you need to invest 5 lakhs rupees in 2023 and increase it by 5% every year going forward./n -->
                        // <!-- from year 2046 onwards, start moving funds from equity to debt funds to ensure there is limited risk. -->

            

            }
            // console.log("Check here for yearly investment amounts");
            // console.log(portfolio);
            return(portfolio);
    
    
        }

       
    

    // allocate funds ( newPortfolio, yearly investment amount, allocation schedule)

        //distribute for the investment amount for the first year.
        // distribute the portfolio amount for the second year to the amounts at asset class level
        // amount to invest in an assest = the amount desired in the asset - amount invested in the previous year * expected return for the asset.



    function getgoals(){

        var goals = {};
        // Iterate through table rows and extract data
        $("table tbody tr").each(function () {
            console.log("next row");
            var goalName = $(this).find("input[name='goal']").val(); 
            var rowData = {
                "ValueToday": $(this).find("input[name='amount']").val(),
                "WithdrawalYear": $(this).find("input[name='withdrawalyear']").val(),
                "CurrentSavings": $(this).find("input[name='currentAmount']").val()
            };
            goals[goalName] = {};
            goals[goalName] = rowData;
        });
        return goals;
    }
    


    // Function to populate the allocation table dynamically
    function populateAllocationTable(allocation_sch) {
    const tableBody = document.getElementById('allocationTableBody');
    tableBody.innerHTML = ''; // Clear existing rows if any

    // Iterate over each year in the allocation object
    for (let year in allocation_sch) {
        const row = document.createElement('tr');
        
        // Year column
        const yearCell = document.createElement('td');
        yearCell.textContent = year;
        row.appendChild(yearCell);
        
        // Equity, Debt, Gold, Real Estate columns
        ['Equity', 'Debt', 'Gold', 'RealEstate'].forEach(asset => {
            const cell = document.createElement('td');
            cell.textContent = (allocation_sch[year][asset] * 100).toFixed(1) + '%'; // Convert to percentage
            row.appendChild(cell);
        });

        // Append row to the table body
        tableBody.appendChild(row);
    }
    return
}

///////////////////////////////////////////////////////////////////////////

$(function () {





    $("#insertRow").on("click", function (event) {
        event.preventDefault();

        var newRow = $("<tr>");
        var cols = '';

        // Table columns
        cols += '<td><input class="form-control rounded-0" type="text" name="goal" placeholder="Goal name"></td>';
        cols += '<td><input class="form-control rounded-0" type="number" name="amount" placeholder="Amount"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="withdrawalyear" placeholder="Year"></td>';
        cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="bi bi-trash-fill"></i></button</td>';

        // Insert the columns inside a row
        newRow.append(cols);

        // Insert the row inside a table
        $("table").append(newRow);

    });

    // Remove row when delete btn is clicked
    $("table").on("click", "#deleteRow", function (event) {
        $(this).closest("tr").remove();
    });


    // get the goals and calculate  

    $("#Calculate").on("click", function (event) {
        // event.preventDefault();


        // populateAllocationTable(allocation);

        goals = getgoals();
      

        console.log(goals);


        //manaual override
        // var goals = {};
        // goals["goal1"] = {ValueToday: 10000 , WithdrawalYear: 2025};
        // goals['Marriage']={ValueToday:3000000,WithdrawalYear:2031};
        // goals['Buy House']={ValueToday:3000000,WithdrawalYear:2024};
        // goals['Holiday Home']={ValueToday:3000000,WithdrawalYear:2028};
        // goals['Buy Car']={ValueToday:3000000,WithdrawalYear:2029};
        // goals['Child 1 Higher Education']={ValueToday:5000000,WithdrawalYear:2042};
        // goals['Child 2 Higher Education']={ValueToday:5000000,WithdrawalYear:2044};
        // goals['Child 1 Marriage']={ValueToday:3000000,WithdrawalYear:2050};
        // goals['Child 2 Marriage']={ValueToday:3000000,WithdrawalYear:2052};
        // goals['Business Venture']={ValueToday:3000000,WithdrawalYear:2035};
        // goals['Buy Luxury Car / SUV']={ValueToday:5000000,WithdrawalYear:2040};
        // goals['Retirement']={ValueToday:30000000,WithdrawalYear:2056};


        goals = deriveInflationAdjustedCost(goals);
        // console.log(goals);

        // generatePortfolio(goals , allocation, rates);

        // plotgraph(generatePortfolio(goals , allocation, rates));
       
        plotgraph(calculateYearlyInvestment(goals , allocation, rates));

        // plotAllGoals(calculateYearlyInvestment(goals , allocation, rates));

    });








});