<?php
$servername = "localhost";  // o la IP del servidor MySQL
$username = "usuario_bd";
$password = "contraseña_bd";
$database = "nombre_bd";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión exitosa";
}
?>
