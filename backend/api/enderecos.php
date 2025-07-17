<?php

// Configurações de Headers para CORS e JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Tratamento prévio para requisições OPTIONS (Preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusões de configurações, classes e utilitários
include_once '../config/db.php';
include_once '../classes/Enderecos.php';

// Instância de conexões e objetos
$database = new Database();
$db = $database->getConnection();

$enderecos = new Enderecos($db);

$method = $_SERVER['REQUEST_METHOD'];

/**
 * Controle de métodos HTTP
 */
switch ($method) {
    /**
     * GET - Consulta de registros
     * - Se houver ID, retorna um registro específico
     * - Caso contrário, retorna todos os registros
     */
    case 'GET':

        if (isset($_GET['id'])) {
            $enderecos->id = $_GET['id'];
            $endereco_item = $enderecos->lerPorId();

            if ($endereco_item) {
                http_response_code(200);
                echo json_encode($endereco_item);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Endereço não encontrado."]);
            }
        } else {
            $stmt = $enderecos->ler();
            $enderecos_arr = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $enderecos_arr[] = [
                    "id" => $id,
                    "titulo" => $titulo,
                    "endereco" => $endereco,
                    "cidade" => $cidade,
                    "estado" => $estado,
                    "mapa" => $mapa,
                    "link" => $link,
                    "horario_atendimento" => $horario_atendimento,
                    "telefone" => $telefone,
                    "status" => (bool) $status
                ];
            }

            http_response_code(200);
            echo json_encode($enderecos_arr);
        }

        break;

    /**
         * POST - Criação ou Atualização de registro
         * - Se houver ID, atualiza
         * - Caso contrário, cria novo
         */
    case 'POST':

        // Preenche o objeto
        $enderecos->id = $_POST['id'];
        $enderecos->titulo = $_POST['titulo'];
        $enderecos->endereco = $_POST['endereco'];
        $enderecos->cidade = $_POST['cidade'];
        $enderecos->estado = $_POST['estado'];
        $enderecos->mapa = $_POST['mapa'];
        $enderecos->link = $_POST['link'];
        $enderecos->horario_atendimento = $_POST['horario_atendimento'];
        $enderecos->telefone = $_POST['telefone'];
        $enderecos->status = filter_var($_POST['status'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

        // Atualiza ou cria novo
        if (!empty($_POST['id']) && is_numeric($_POST['id'])) {
            if ($enderecos->atualizar()) {
                http_response_code(201);
                echo json_encode(["message" => "Endereço atualizado com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível atualizar o endereço."]);
            }
        } else {
            if ($enderecos->criar()) {
                http_response_code(201);
                echo json_encode(["message" => "Endereço criado com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível criar o endereço."]);
            }
        }

        break;

    /**
         * DELETE - Exclusão de registro
         */
    case 'DELETE':

        // Captura o ID via JSON do corpo da requisição
        $data = json_decode(file_get_contents("php://input"));

        $enderecos->id = $data->id ?? null;

        // Deleta o registro do banco
        if ($enderecos->deletar()) {
            http_response_code(200);
            echo json_encode(["message" => "Endereço deletado com sucesso."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível deletar o endereço."]);
        }

        break;
}
