  var ExcelToJSON = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
          var json_object = JSON.stringify(XL_row_object);
        //    var result = JSON.parse(json_object);
        //    for (row in result){
        //     addRow("fromXLS",fundData[row]);
        //    }
        // console.log(" Ma here");
          // console.log(JSON.parse(json_object));
            addFundRowsFromXls(JSON.parse(json_object));
          
        //   jQuery('#xlx_json').val(json_object);
      };

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };

  };

  function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
 
  }

  function addFundRowsFromXls(fundData){
    for (row in fundData){
           addRow("Funds",fundData[row]);       
    }
  }

  function arrayToCSVString(array){
    var csv = "";
    for (let row of array) {
        for (let col of row) { csv += col + ","; }
        csv += "\r\n";
    }
    return csv;
  }

  function dictToCSVString(dict){
    var csv = "";
    
    for (let row in dict) {
        console.log(row);
        csv += row + ",";
        for (let col of dict[row]) { csv += col + ","; }
        csv += "\r\n";
    }
    return csv;
  }

  function exportData(array,id,exportType){


        var csv = arrayToCSVString(array);
        // var csv = dictToCSVString(array);

      if (exportType =="SecurityWiseDistribution"){
        var headerRow="Security, Amount in Portfolio, Weight in Portfolio \r\n";
      }
      if (exportType =="IndustryWiseDistribution"){
        var headerRow="Industry, Amount in Portfolio, Weight in Portfolio \r\n";
      }
      if (exportType =="OverlapWithPortfolio"){
        var headerRow="Security, Amount in Portfolio, Amount in selected Fund, Common Amount \r\n";
      }
      if (exportType =="PairWiseOverlap"){
        var headerRow="Fund Combination, Overlap in the Funds (in %) \r\n";
      }

      var csv = headerRow + csv;

        var myBlob = new Blob([csv], {type: "text/csv"});
        var url = window.URL.createObjectURL(myBlob);
        // var anchor = document.createElement("a");        
        var anchor = document.getElementById("downloadBtn"+id);        
        anchor.href = url;
        anchor.download = "data.csv";
        // anchor.click();
        // window.URL.revokeObjectURL(url);
        // anchor.remove();

     }