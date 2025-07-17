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
include_once '../classes/RedesSociais.php';

// Instância de conexões e objetos
$database = new Database();
$db = $database->getConnection();

$redes_sociais = new RedesSociais($db);

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
            $redes_sociais->id = $_GET['id'];
            $rede_social_item = $redes_sociais->lerPorId();

            if ($rede_social_item) {
                http_response_code(200);
                echo json_encode($rede_social_item);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Rede Social não encontrada."]);
            }
        } else {
            $stmt = $redes_sociais->ler();
            $redes_sociais_arr = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $redes_sociais_arr[] = [
                    "id" => $id,
                    "titulo" => $titulo,
                    "link" => $link,
                    "icone" => $icone,
                    "status" => (bool) $status
                ];
            }

            http_response_code(200);
            echo json_encode($redes_sociais_arr);
        }

        break;

    /**
     * POST - Criação ou Atualização de registro
     * - Se houver ID, atualiza
     * - Caso contrário, cria novo
     */
    case 'POST':

        // Preenche o objeto
        $redes_sociais->id = $_POST['id'];
        $redes_sociais->titulo = $_POST['titulo'];
        $redes_sociais->link = $_POST['link'];
        $redes_sociais->icone = (preg_match('/class="([^"]+)"/', $_POST['icone'], $matches) && isset($matches[1]) ? $matches[1] : $_POST['icone']);
        $redes_sociais->status = filter_var($_POST['status'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

        // Atualiza ou cria novo
        if (!empty($_POST['id']) && is_numeric($_POST['id'])) {
            if ($redes_sociais->atualizar()) {
                http_response_code(201);
                echo json_encode(["message" => "Rede Social atualizada com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível atualizar a rede social."]);
            }
        } else {
            if ($redes_sociais->criar()) {
                http_response_code(201);
                echo json_encode(["message" => "Rede Social criada com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível criar a rede social."]);
            }
        }

        break;

    /**
     * DELETE - Exclusão de registro
     */
    case 'DELETE':

        // Captura o ID via JSON do corpo da requisição
        $data = json_decode(file_get_contents("php://input"));

        $redes_sociais->id = $data->id ?? null;

        // Deleta o registro do banco
        if ($redes_sociais->deletar()) {
            http_response_code(200);
            echo json_encode(["message" => "Rede Social deletada com sucesso."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível deletar a rede social."]);
        }

        break;
}