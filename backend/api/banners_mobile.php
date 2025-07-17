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
include_once '../classes/BannersMobile.php';
include_once '../classes/TamanhoImagens.php';
require_once "../utils/Imagens.php";
require_once "../utils/UrlAmigavel.php";

// Instância de conexões e objetos
$database = new Database();
$db = $database->getConnection();

$banners_mobile = new BannersMobile($db);
$tamanho_imagem = new TamanhoImagens($db);
$imagens = new Imagens();

$method = $_SERVER['REQUEST_METHOD'];

/**
 * Controle de métodos HTTP
 */
switch ($method) {
    /**
     * GET - Consulta de registros mobile
     * - Se houver ID, retorna um registro mobile específico
     * - Caso contrário, retorna todos os registros mobile
     */
    case 'GET':

        if (isset($_GET['id'])) {
            $banners_mobile->id = $_GET['id'];
            $banner_mobile_item = $banners_mobile->lerPorId();

            if ($banner_mobile_item) {
                http_response_code(200);
                echo json_encode($banner_mobile_item);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Banner Mobile não encontrado."]);
            }
        } else {
            $stmt = $banners_mobile->ler();
            $banners_arr = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $banners_arr[] = [
                    "id" => $id,
                    "titulo" => $titulo,
                    "imagem" => $imagem,
                    "posicao" => $posicao,
                    "status" => (bool) $status
                ];
            }

            http_response_code(200);
            echo json_encode($banners_arr);
        }

        break;

    /**
     * POST - Criação ou Atualização de registro
     * - Se houver ID, atualiza
     * - Caso contrário, cria novo
     */
    case 'POST':

        // Busca dados atuais do registro (se for edição)
        if (!empty($_POST['id']) && is_numeric($_POST['id'])) {
            $banners_mobile->id = $_POST['id'];
            $banner_mobile_item = $banners_mobile->lerPorId();

            $imagem_atual = $banner_mobile_item['imagem'] ?? null;
            $webp_atual = $banner_mobile_item['imagem_webp'] ?? null;
            $imagem_largura = $banner_mobile_item['imagem_largura'] ?? null;
            $imagem_altura = $banner_mobile_item['imagem_altura'] ?? null;
            $thumb_atual = $banner_mobile_item['thumb'] ?? null;
            $thumb_largura = $banner_mobile_item['thumb_largura'] ?? null;
            $thumb_altura = $banner_mobile_item['thumb_altura'] ?? null;
        } else {
            $imagem_atual = "";
            $webp_atual = "";
            $imagem_largura = "";
            $imagem_altura = "";
            $thumb_atual = "";
            $thumb_largura = "";
            $thumb_altura = "";
        }

        // Upload da nova imagem (se enviada)
        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
            // Busca configurações de tamanho da imagem
            $tamanho_imagem->id = "2";
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
        $banners_mobile->id = $_POST['id'];
        $banners_mobile->titulo = $_POST['titulo'];
        $banners_mobile->descricao = $_POST['descricao'];
        $banners_mobile->link = $_POST['link'];
        $banners_mobile->texto_botao = $_POST['texto_botao'];
        $banners_mobile->imagem = $imagem;
        $banners_mobile->imagem_webp = $imagem_webp;
        $banners_mobile->imagem_largura = $imagem_largura;
        $banners_mobile->imagem_altura = $imagem_altura;
        $banners_mobile->thumb = $thumb;
        $banners_mobile->thumb_largura = $thumb_largura;
        $banners_mobile->thumb_altura = $thumb_altura;
        $banners_mobile->abrir_nova_guia = filter_var($_POST['abrir_nova_guia'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
        $banners_mobile->posicao = (int) $_POST['posicao'];
        $banners_mobile->status = filter_var($_POST['status'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

        // Atualiza ou cria novo
        if (!empty($_POST['id']) && is_numeric($_POST['id'])) {
            if ($banners_mobile->atualizar()) {
                http_response_code(201);
                echo json_encode(["message" => "Banner Mobile atualizado com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível atualizar o banner mobile."]);
            }
        } else {
            if ($banners_mobile->criar()) {
                http_response_code(201);
                echo json_encode(["message" => "Banner Mobile criado com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível criar o banner mobile."]);
            }
        }

        break;

    /**
     * DELETE - Exclusão de registro
     */
    case 'DELETE':

        // Captura o ID via JSON do corpo da requisição
        $data = json_decode(file_get_contents("php://input"));

        $banners_mobile->id = $data->id ?? null;

        // Busca o registro mobile atual
        $banner_mobile_item = $banners_mobile->lerPorId();

        $pasta = "banners_mobile";
        $imagem_atual = $banner_mobile_item['imagem'] ?? null;
        $webp_atual = $banner_mobile_item['imagem_webp'] ?? null;
        $thumb_atual = $banner_mobile_item['thumb'] ?? null;

        // Remove as imagens físicas
        $imagens->deletar(
            $pasta,
            $imagem_atual,
            $webp_atual,
            $thumb_atual
        );

        // Deleta o registro do banco
        if ($banners_mobile->deletar()) {
            http_response_code(200);
            echo json_encode(["message" => "Banner Mobile deletado com sucesso."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível deletar o banner mobile."]);
        }

        break;
}