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
include_once '../classes/Sobre.php';
include_once '../classes/TamanhoImagens.php';
require_once "../utils/Imagens.php";
require_once "../utils/UrlAmigavel.php";

// Instância de conexões e objetos
$database = new Database();
$db = $database->getConnection();

$sobre = new Sobre($db);
$tamanho_imagem = new TamanhoImagens($db);
$imagens = new Imagens();

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

        $sobre_item = $sobre->ler();

        if ($sobre_item) {
            http_response_code(200);
            echo json_encode($sobre_item);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Sobre não encontrado."]);
        }

        break;

    /**
         * POST - Criação ou Atualização de registro
         * - Se houver ID, atualiza
         * - Caso contrário, cria novo
         */
    case 'POST':

        // Busca dados atuais do registro (se for edição)
        $sobre_item = $sobre->ler();

        $imagem_atual = $sobre_item['imagem'] ?? null;
        $webp_atual = $sobre_item['imagem_webp'] ?? null;
        $imagem_largura = $sobre_item['imagem_largura'] ?? null;
        $imagem_altura = $sobre_item['imagem_altura'] ?? null;
        $thumb_atual = $sobre_item['thumb'] ?? null;
        $thumb_largura = $sobre_item['thumb_largura'] ?? null;
        $thumb_altura = $sobre_item['thumb_altura'] ?? null;


        // Upload da nova imagem (se enviada)
        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
            // Busca configurações de tamanho da imagem
            $tamanho_imagem->id = "3";
            $tamanho_imagens_item = $tamanho_imagem->lerPorId();

            $pasta = $tamanho_imagens_item['tabela'];
            $imagem_largura = $tamanho_imagens_item['imagem_largura'];
            $imagem_altura = $tamanho_imagens_item['imagem_altura'];
            $thumb_largura = $tamanho_imagens_item['thumb_largura'];
            $thumb_altura = $tamanho_imagens_item['thumb_altura'];

            // Faz upload e gera imagens
            $resultado = $imagens->upload(
                $imagem_atual,
                $webp_atual,
                $thumb_atual,
                $pasta,
                UrlAmigavel($_POST['titulo']),
                $_FILES['imagem'],
                $imagem_largura,
                $imagem_altura,
                $thumb_largura ?? null,
                $thumb_altura ?? null
            );

            // Novos nomes das imagens
            $imagem = $resultado['imagem'];
            $imagem_webp = $resultado['imagem_webp'];
            $thumb = $resultado['thumb'] ?? null;
        } else {
            // Mantém as imagens antigas
            $imagem = $imagem_atual;
            $imagem_webp = $webp_atual;
            $thumb = $thumb_atual;
        }

        // Preenche o objeto
        $sobre->titulo = $_POST['titulo'];
        $sobre->resumo = $_POST['resumo'];
        $sobre->texto = $_POST['texto'];
        $sobre->imagem = $imagem;
        $sobre->imagem_webp = $imagem_webp;
        $sobre->imagem_largura = $imagem_largura;
        $sobre->imagem_altura = $imagem_altura;
        $sobre->thumb = $thumb;
        $sobre->thumb_largura = $thumb_largura;
        $sobre->thumb_altura = $thumb_altura;
        $sobre->link = $_POST['link'];

        // Atualiza
        if ($sobre->atualizar()) {
            http_response_code(201);
            echo json_encode(["message" => "Sobre atualizado com sucesso."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível atualizar o sobre."]);
        }

        break;
}
