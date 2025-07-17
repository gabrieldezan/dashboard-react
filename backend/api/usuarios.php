<?php

// Headers para permitir CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Adicione OPTIONS aqui
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Se for uma requisição OPTIONS, retorne apenas as headers e termine a execução
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/db.php';
include_once '../classes/Usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $usuario->ler();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $usuarios_arr = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $usuario_item = array(
                    "id" => $id,
                    "nome" => $nome,
                    "email" => $email
                );
                array_push($usuarios_arr, $usuario_item);
            }
            http_response_code(200);
            echo json_encode($usuarios_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Nenhum usuário encontrado."));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        $usuario->nome = $data->nome;
        $usuario->email = $data->email;
        $usuario->senha = $data->senha;

        if ($usuario->criar()) {
            http_response_code(201);
            echo json_encode(array("message" => "Usuário criado com sucesso."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Não foi possível criar o usuário."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        $usuario->id = $data->id;
        $usuario->nome = $data->nome;
        $usuario->email = $data->email;

        if ($usuario->atualizar()) {
            http_response_code(200);
            echo json_encode(array("message" => "Usuário atualizado com sucesso."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Não foi possível atualizar o usuário."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $usuario->id = $data->id;

        if ($usuario->deletar()) {
            http_response_code(200);
            echo json_encode(array("message" => "Usuário deletado com sucesso."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Não foi possível deletar o usuário."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Método não permitido."));
        break;
}
