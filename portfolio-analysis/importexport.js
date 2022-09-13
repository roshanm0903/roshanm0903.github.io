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
        console.log(" Ma here");
          console.log(JSON.parse(json_object));
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