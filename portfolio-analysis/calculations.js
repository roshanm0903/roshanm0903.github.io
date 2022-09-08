function generatePorfolio(Funds, Data){

    console.log("Funds are.....");
    console.log(Funds);
    var FundData = Data;

    // get share of fund for each stock.
    var securityWise = {};
    var industryWise = {};

    var UserFunds = Funds[0].map((_, colIndex) => Funds.map(row => row[colIndex])); // transpose

    var portfolioAmount  =  UserFunds[1].reduce((a, b) => a + b, 0);

    // get the single fund name which is to be compared with the portfolio
    var compFund = UserFunds[0][ UserFunds[2].indexOf(true)]; 
    
    console.log("portfolio Amount "+portfolioAmount );
    // console.log("comp fund "+compFund );
    // console.log(FundData);

    for (row in FundData){
        // multiply the security fractional ammount with the fund amount
        var Amount = UserFunds[1][ UserFunds[0].indexOf(FundData[row][0])];
        var secAmount = (FundData[row][3]*Amount);
        FundData[row].push(secAmount );
        
        // console.log("Printing Fund Data");
        // console.log(FundData);

        //summarise by security wise
        if ( FundData[row][1] in securityWise ){     // { "security name 1" : [ amount , portfolio_percentage, compfund_shareholding], "security name w" : [ amount , portfolio_percentage, compfund_shareholding],...  }
            // security already exists, add the amounts
            securityWise[FundData[row][1]][0] += secAmount; // amount
            securityWise[FundData[row][1]][1] += (secAmount/portfolioAmount); // as percentage
            securityWise[FundData[row][1]][2] = checkCompFund(compFund,FundData[row]);

        } else{
            //security doesnt exists, add the security and the amount
            securityWise[FundData[row][1]] = [ secAmount , secAmount/portfolioAmount, checkCompFund(compFund,FundData[row]) ] ;
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
    console.log("printing sdcuritywise");
    // console.log(securityWise);

    return [securityWise,industryWise,compFund];

}


function dotProduct(vectors){
    
    var dot_sum = 0;
    var a_sum = 0;
    var b_sum = 0;

    for (row in vectors){
        var a = Number(vectors[row][1] );
        var b = Number(vectors[row][2] );
        vectors[row][3] = a*b; //a.b
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

    return  [Math.round(value ), vectors ];

}

function checkCompFund(fundName,fundDetailRow){
 
    if(fundName == fundDetailRow[0]){
        return (fundDetailRow[3]);
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
          return [key, dict[key][0],dict[key][1],dict[key][2]];
        });

    items.sort(function(first, second) {
        return second[3] - first[3];
    });
    
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
Footer
