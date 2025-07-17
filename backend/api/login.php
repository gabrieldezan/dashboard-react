<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/db.php';
include_once '../classes/Usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

$usuario->email = $data->email;
$usuario->senha = $data->senha;

$stmt = $usuario->login();
$num = $stmt->rowCount();

if ($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (password_verify($usuario->senha, $row['senha'])) {
        echo json_encode(array("message" => "Login realizado com sucesso.", "id" => $row['id'], "nome" => $row['nome']));
    } else {
        echo json_encode(array("message" => "Senha incorreta."));
    }
} else {
    echo json_encode(array("message" => "Usuário não encontrado."));
}