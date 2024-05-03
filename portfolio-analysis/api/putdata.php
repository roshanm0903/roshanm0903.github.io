<?php
    //open connection to mysql db
    $connection = mysqli_connect("localhost","id19512547_funddataadmin","Saibaba@2023","id19512547_funddata") or die("Error " . mysqli_error($connection));

    
    $Skew = $_REQUEST["skew"];
    $Amount = $_REQUEST["amount"];
    $Funds = $_REQUEST["portfolioFunds"];
    
   
     try{
         //log the fundnames
        $sql = "INSERT INTO LogTable (FundName, Amount, sec_count, sec_50, sec_80,sec_98,sec_50_per, sec_80_per,sec_98_per,ind_count, ind_50, ind_80,ind_98,ind_50_per, ind_80_per,ind_98_per ) VALUES ('"
               . $Funds . "'," 
               . $Amount . ","
               . $Skew['security']['count']. ","
               . $Skew['security']['50']. ","
               . $Skew['security']['80']. ","
               . $Skew['security']['98']. ","
               . $Skew['security']['50_per']. ","
               . $Skew['security']['80_per']. ","
               . $Skew['security']['98_per']. ","
               . $Skew['industry']['count']. ","
               . $Skew['industry']['50']. ","
               . $Skew['industry']['80']. ","
               . $Skew['industry']['98']. ","
               . $Skew['industry']['50_per']. ","
               . $Skew['industry']['80_per']. ","
               . $Skew['industry']['98_per']. "
        
        )"  ;
        
         mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
     }
     catch (SomeException $ignored)
     {
         // do nothing... php will ignore and continue
         // but maybe use "ignored" as name to silence IDE warnings.  
     }
        
            
    
    
    //close the db connection
    mysqli_close($connection);
?>