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
include_once '../classes/TamanhoImagens.php';

// Instância de conexões e objetos
$database = new Database();
$db = $database->getConnection();

$tamanho_imagens = new TamanhoImagens($db);

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
            $tamanho_imagens->id = $_GET['id'];
            $rede_social_item = $tamanho_imagens->lerPorId();

            if ($rede_social_item) {
                http_response_code(200);
                echo json_encode($rede_social_item);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Tamanho da Imagem não encontrado."]);
            }
        } else {
            $stmt = $tamanho_imagens->ler();
            $tamanho_imagens_arr = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $tamanho_imagens_arr[] = [
                    "id" => $id,
                    "tabela" => $tabela,
                    "imagem_largura" => $imagem_largura,
                    "imagem_altura" => $imagem_altura,
                    "thumb_largura" => $thumb_largura,
                    "thumb_altura" => $thumb_altura
                ];
            }

            http_response_code(200);
            echo json_encode($tamanho_imagens_arr);
        }

        break;

    /**
     * POST - Criação ou Atualização de registro
     * - Se houver ID, atualiza
     * - Caso contrário, cria novo
     */
    case 'POST':

        // Preenche o objeto
        $tamanho_imagens->id = $_POST['id'];
        $tamanho_imagens->tabela = $_POST['tabela'];
        $tamanho_imagens->imagem_largura = $_POST['imagem_largura'];
        $tamanho_imagens->imagem_altura = $_POST['imagem_altura'];
        $tamanho_imagens->thumb_largura = $_POST['thumb_largura'] === '' ? 0 : (int)$_POST['thumb_largura'];
    
        $tamanho_imagens->thumb_altura = $_POST['thumb_altura'] === '' ? 0 : (int)$_POST['thumb_altura'];

        // Atualiza ou cria novo
        if (!empty($_POST['id']) && is_numeric($_POST['id'])) {
            if ($tamanho_imagens->atualizar()) {
                http_response_code(201);
                echo json_encode(["message" => "Tamanho da Imagem atualizado com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível atualizar o tamanho da imagem."]);
            }
        } else {
            if ($tamanho_imagens->criar()) {
                http_response_code(201);
                echo json_encode(["message" => "Tamanho da Imagem criado com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível criar o tamanho da imagem."]);
            }
        }

        break;

    /**
     * DELETE - Exclusão de registro
     */
    case 'DELETE':

        // Captura o ID via JSON do corpo da requisição
        $data = json_decode(file_get_contents("php://input"));

        $tamanho_imagens->id = $data->id ?? null;

        // Deleta o registro do banco
        if ($tamanho_imagens->deletar()) {
            http_response_code(200);
            echo json_encode(["message" => "Tamanho da Imagem deletada com sucesso."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível deletar a tamanho da imagem."]);
        }

        break;
}