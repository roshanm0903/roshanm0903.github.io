<?php

$con = mysqli_init(); 

mysqli_ssl_set($con,NULL,NULL, "../DigiCertGlobalRootCA.crt.pem", NULL, NULL); 
mysqli_real_connect($conn, "portfolioanalyzer-server.mysql.database.azure.com", "rwvnlbulsc", "Saibaba@2023", "portfolioanalyzer-database", 3306, MYSQLI_CLIENT_SSL);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
  echo "Table MyGuests created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


// mysqli_close($conn);

// DB connection info
// $host = "portfolioanalyzer-server.mysql.database.azure.com";
// $user = "rwvnlbulsc";
// $pwd = "C5J1TZOMVJWPQ2FO$";
// $db = "portfolioanalyzer-database";

// try{
// $conn = new PDO( "mysql:host=$host;dbname=$db", $user, $pwd);
// $conn‐>setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
// $sql = "CREATE TABLE registration_tbl(
// id INT NOT NULL AUTO_INCREMENT,
// PRIMARY KEY(id),
// name VARCHAR(30),
// email VARCHAR(30),
// date DATE)";
// $conn‐>query($sql);
// }
// catch(Exception $e){
// die(print_r($e));
// }
// echo "<h3>Table created.</h3>";

?>




