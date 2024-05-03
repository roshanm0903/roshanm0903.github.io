<?php
    // open connection to mysql db
    $connection = mysqli_connect("localhost","id19512547_funddataadmin","Saibaba@2023","id19512547_funddata") or die("Error " . mysqli_error($connection));

    
    $Type = $_GET['Type'];
    
    $FundNames = str_getcsv($_GET['FundNames']);
    
    array_pop($FundNames);

    if ($Type == "FundNames") {
            $sql = "select * from Links";
            
            $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

            //create an array
            $dataarray = array();
            while($row =mysqli_fetch_assoc($result))
            {
                $dataarray["data"][] = $row;
            }
            header('Content-type: application/json');
            echo json_encode($dataarray);
            
        }
    
    if ($Type == "FundHoldings") {
        
        
             try{
                 //log the fundnames
                $sql = "INSERT INTO LogTable (FundName) VALUES ('" . $_GET['FundNames'] . "')"  ;
                 mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
             }
             catch (SomeException $ignored)
             {
                 // do nothing... php will ignore and continue
                 // but maybe use "ignored" as name to silence IDE warnings.  
             }
        
            
            //loop through differnt funds
            
            $dataCombinedarray = array();
            foreach ($FundNames as $fundname) {
                $dataarray = array();
                $sql = "select Security,Sector,Share from Holdings where FundName = '".$fundname."'";
                $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
            
                    // run query
                    while($row =mysqli_fetch_assoc($result))
                    {
                        $dataarray[] = $row;
                    }
                $dataCombinedarray[$fundname] = $dataarray;
                
                }

            $finalData["data"] = $dataCombinedarray;
            header('Content-type: application/json');
            echo json_encode($finalData);
            
        
            
        }

    
    //close the db connection
    mysqli_close($connection);

    echo "getdata File";
?>