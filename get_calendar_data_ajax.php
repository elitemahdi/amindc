<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'amindc_db';
$user = 'root';
$pass = 'ELITEmahdi@137991';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$date = isset($_GET['date']) ? $_GET['date'] : date('Y-m-d');

try {
    $stmt = $pdo->prepare("SELECT * FROM appointments WHERE date = ?");
    $stmt->execute([$date]);
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($appointments);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>