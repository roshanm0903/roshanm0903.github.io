function generatePorfolio(Funds, Data){

    console.log("Funds are.....");
    console.log(Funds);
    var FundData = Data;

    // get share of fund for each stock.
    var securityWise = {};
    var industryWise = {};

    var UserFunds = Funds[0].map((_, colIndex) => Funds.map(row => row[colIndex])); // transpose
    var portfolioAmount = 0;
    for (index in UserFunds[1]){
        if ( !UserFunds[2][index]){
            portfolioAmount += UserFunds[1][index];
        }
    }
    // var portfolioAmount  =  UserFunds[1].reduce((a, b) => a + b, 0);


    // get the single fund name which is to be compared with the portfolio
    var compFund = UserFunds[0][ UserFunds[2].indexOf(true)]; 
    var compFundAmount = UserFunds[1][ UserFunds[2].indexOf(true)]; 
    
    console.log("portfolio Amount "+portfolioAmount );
    console.log("comp fund "+compFund );
    console.log("FUND DATA IS ///////");
    console.log(FundData);

    for (row in FundData){
        // multiply the security fractional ammount with the fund amount
        var Amount = UserFunds[1][ UserFunds[0].indexOf(FundData[row][0])];
        var secAmount = 0;
        if (checkCompFund(compFund,FundData[row]) == 0){
            secAmount = parseFloat(FundData[row][3]*Amount);
        }
        
        FundData[row].push(secAmount);
        
        // console.log("Printing Fund Data");
        // console.log(FundData);

        //summarise by security wise
        if ( FundData[row][1] in securityWise ){     // { "security name 1" : [ amount , portfolio_percentage, compfund_shareholding, compfund_], "sec2 ..."
            // security already exists, add the amounts
            securityWise[FundData[row][1]][0] += secAmount; // amount
            securityWise[FundData[row][1]][1] += parseFloat(secAmount/portfolioAmount); // as percentage
            securityWise[FundData[row][1]][2] += checkCompFund(compFund,FundData[row]);
            securityWise[FundData[row][1]][3] += checkCompFund(compFund,FundData[row])*compFundAmount ;

        } else{
            //security doesnt exists, add the security and the amount
            securityWise[FundData[row][1]] = [ secAmount , parseFloat(secAmount/portfolioAmount), checkCompFund(compFund,FundData[row]), checkCompFund(compFund,FundData[row])*compFundAmount] ;
        }

        //sumarise by industry wise
        if ( FundData[row][2] in industryWise ){
            // security already exists, add the amounts
            industryWise[FundData[row][2]][0] += secAmount;
            industryWise[FundData[row][2]][1] += secAmount/portfolioAmount;
        } else{
            //security doesnt exists, add the security and the amount
            industryWise[FundData[row][2]] = [ secAmount, secAmount/portfolioAmount];
        }

    }
    // console.log("printing indsury wise .........");
    // console.log(industryWise);
    

    return [securityWise,industryWise,compFund,portfolioAmount];

}

function getFundNames(Funds){
    var fundname_concat =[];

    for (fund in Funds){
        fundname_concat = fundname_concat + Funds[fund][0] + ",";
    }
    return fundname_concat;
}

function dotProduct(vectors){
    
    var dot_sum = 0;
    var a_sum = 0;
    var b_sum = 0;

    for (row in vectors){
        var a = parseFloat(vectors[row][1] );
        var b = parseFloat(vectors[row][2] );
        vectors[row][1] = parseFloat(100*a).toFixed(2);
        vectors[row][2] = parseFloat(100*b).toFixed(2);
        vectors[row][3] = parseFloat(100*a*b).toFixed(2);; //a.b
        dot_sum += (a*b);
        a_sum += (a*a);
        b_sum += (b*b);
    }

    var value = (100*dot_sum/(Math.sqrt(a_sum)*Math.sqrt(b_sum))) ;
    console.log(value);
    console.log("vectors");
    console.log(vectors);

    //sort the vector on column 4
    // vectors = getSortedCommonSecurity(vectors);

    return  [Math.round(value), vectors ];

}

function getOverlap(vectors){
    
    var overlap_sum = 0;
    var a_sum = 0;
    var b_sum = 0;

    for (row in vectors){
        var a = parseFloat(vectors[row][1] );
        var b = parseFloat(vectors[row][2] );
        vectors[row][1] = parseFloat(100*a).toFixed(2);
        vectors[row][2] = parseFloat(100*b).toFixed(2);
        vectors[row][3] = Math.min(a,b); //a.b
        overlap_sum += vectors[row][3];
        a_sum += a;
        b_sum += b ;
        
    }

    var value = (100*2*overlap_sum/(a_sum+b_sum));
    console.log(value);
    console.log("vectors");
    console.log(vectors);

    //sort the vector on column 4
    // vectors = getSortedCommonSecurity(vectors);

    return  [Math.round(value), vectors ];

}

function getOverlapWithPortfolio(vectors){
    
    //amount in portfolio, share holding in portfolio, share holding in comparing fund, amount in comparing fund
    
    var overlap_sum = 0;
    var b_sum = 0;

    for (row in vectors){
        var a = parseFloat(vectors[row][0] );
        var b = parseFloat(vectors[row][3] );
        vectors[row][1] = parseFloat(a).toFixed(2);
        vectors[row][2] = parseFloat(b).toFixed(2);
        vectors[row][3] = Math.min(a,b); //a.b
        overlap_sum += vectors[row][3];
        b_sum += b ;
        
    }

    var value = (100*overlap_sum/b_sum);
    console.log(value);
    console.log("vectors");
    console.log(vectors);

    //sort the vector on column 4
    // vectors = getSortedCommonSecurity(vectors);

    return  [Math.round(value), vectors ];

}

function checkCompFund(fundName,fundDetailRow){
 
    if(fundName == fundDetailRow[0]){
        return parseFloat(fundDetailRow[3]);
    }else{
        return 0;

    }
}

function getSortedData(dict){

    var items = Object.keys(dict).map(function(key) {
          return [key, dict[key][0],dict[key][1]];
        });

    items.sort(function(first, second) {
        return second[1] - first[1];
    });
  

    items  = transpose(items);
    

    return items;

}

function getSortedOverlapData(a,b){
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
    
}

function getSortedCommonSecurity(dict){
    var items = Object.keys(dict).map(function(key) {
          return [key, dict[key][1],dict[key][2],dict[key][3]];
        });

    console.log("items before sorting........");
    console.log(items);

    items.sort(function(first, second) {
        return second[3] - first[3];
    });
    console.log("items after sorting........");
    console.log(items);

    return items;
    
}

function transpose(arr){
    var arr_t = arr[0].map((_, colIndex) => arr.map(row => row[colIndex])); // transpose
    return arr_t
}

function getCombinations(Funds){
    var combiArray = transpose(Funds)[0];

    var results = [];
        for (var i = 0; i < combiArray.length - 1; i++) {
            for (var j = i + 1; j < combiArray.length; j++) {
                results.push([combiArray[i],combiArray[j]]);
            }
        }
    return results;

    }

function getskewness(securityWise,industryWise){

    securityWise = transpose(getSortedData(securityWise));
    industryWise = transpose(getSortedData(industryWise));

    var sec_fifty = 0;
    var sec_eighty = 0;
    var sec_ninetyFive = 0;
    var ind_fifty = 0;
    var ind_eighty = 0;
    var ind_ninetyFive = 0;
    var result = {};

    var fifty_flag = false;
    var eighty_flag = false;

    var temp_cumulator = 0.0;
    var count = 0;

    for (sec in securityWise){
        count +=1;
        temp_cumulator += securityWise[sec][2];
        if ( temp_cumulator > 0.5 && !fifty_flag){
            sec_fifty = count;
            fifty_flag = true;
        }
        if ( temp_cumulator > 0.8 && !eighty_flag){
            sec_eighty = count;
            eighty_flag = true;
        }
        if ( temp_cumulator > 0.95){
            sec_ninetyFive = count;
            break;
        }   
    }

    if(sec_ninetyFive==0.0){
        sec_ninetyFive = 1.0;
    }

    count =0;
    temp_cumulator = 0.0;
    fifty_flag = false;
    eighty_flag = false;
    
    for (sec in industryWise){
        count +=1;
        temp_cumulator += industryWise[sec][2];

        if ( temp_cumulator > 0.5 && !fifty_flag){
            ind_fifty = count;
            fifty_flag = true;
        }
        if ( temp_cumulator > 0.8 && !eighty_flag){
            ind_eighty = count;
            eighty_flag = true;
        }
        if ( temp_cumulator > 0.95){
            ind_ninetyFive = count;
            break;
        }   
    }
    if(ind_ninetyFive==0.0){
        ind_ninetyFive = 1.0;
    }
    // console.log(ind_fiftyPer,ind_eightyPer,ind_ninetyFivePer);

    return { "security":
                        {
                            "count"  : Object.keys(securityWise).length,
                            "50"     : sec_fifty,
                            "80"     : sec_eighty,
                            "98"     : sec_ninetyFive,
                            "50_per" : sec_fifty/Object.keys(securityWise).length,
                            "80_per" : sec_eighty/Object.keys(securityWise).length,
                            "98_per" : sec_ninetyFive/Object.keys(securityWise).length
                        },
            "industry":
                        {
                            "count"  : Object.keys(industryWise).length,
                            "50"     : ind_fifty,
                            "80"     : ind_eighty,
                            "98"     : ind_ninetyFive,
                            "50_per" : ind_fifty/Object.keys(industryWise).length,
                            "80_per" : ind_eighty/Object.keys(industryWise).length,
                            "98_per" : ind_ninetyFive/Object.keys(industryWise).length
                        }


            };
    

}