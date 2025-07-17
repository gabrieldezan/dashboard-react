<?php

class Imagens
{
    public function upload(
        $imagem_atual,
        $webp_atual,
        $thumb_atual,
        $pasta,
        $nome_imagem,
        $imagem,
        $imagem_largura,
        $imagem_altura,
        $thumb_largura = null,
        $thumb_altura = null
    ) {
        if (!file_exists("../uploads/" . $pasta)) {
            mkdir("../uploads/" . $pasta, 0755, true);
        }

        // Remove arquivos antigos
        $this->deletar($pasta, $imagem_atual, $webp_atual, $thumb_atual);

        $ext = strtolower(pathinfo($imagem['name'], PATHINFO_EXTENSION));
        $nome_base = pathinfo("img-" . $nome_imagem . "-" . date("YmdHis"), PATHINFO_FILENAME);

        // Nomes dos arquivos
        $imagem_nome_webp = $nome_base . '.webp';
        $imagem_nome_original = $nome_base . '.' . $ext;
        $thumb_nome = null;

        $caminho_webp = "../uploads/" . $pasta . '/' . $imagem_nome_webp;
        $caminho_original = "../uploads/" . $pasta . '/' . $imagem_nome_original;

        $temp = $imagem['tmp_name'];
        $image = $this->criar($temp, $ext);

        if (!$image) {
            return ['erro' => 'Formato de imagem não suportado.'];
        }

        // Redimensiona imagem
        $image_redimensionada = imagescale($image, $imagem_largura, $imagem_altura);

        // Salva em WebP
        imagewebp($image_redimensionada, $caminho_webp);

        // Salva na extensão original
        switch ($ext) {
            case 'jpg':
            case 'jpeg':
                imagejpeg($image_redimensionada, $caminho_original, 90);
                break;
            case 'png':
                imagepng($image_redimensionada, $caminho_original);
                break;
            case 'webp':
                // já foi salvo acima
                break;
        }

        // Cria thumb se solicitado
        if ($thumb_largura > 0 && $thumb_altura > 0) {
            $thumb_nome = $nome_base . '-thumb.webp';
            $caminho_thumb = "../uploads/" . $pasta . '/' . $thumb_nome;

            $thumb = imagescale($image, $thumb_largura, $thumb_altura);
            imagewebp($thumb, $caminho_thumb);
            imagedestroy($thumb);
        }

        // Limpa
        imagedestroy($image);
        imagedestroy($image_redimensionada);

        return [
            'imagem_webp' => $imagem_nome_webp,
            'imagem' => $imagem_nome_original,
            'thumb' => $thumb_nome
        ];
    }

    private function criar($caminho, $ext)
    {
        $ext = strtolower($ext);
        switch ($ext) {
            case 'jpg':
            case 'jpeg':
                return imagecreatefromjpeg($caminho);
            case 'png':
                return imagecreatefrompng($caminho);
            case 'webp':
                return imagecreatefromwebp($caminho);
            default:
                return false;
        }
    }

    public function deletar($pasta, $imagem, $imagem_webp, $thumb)
    {
        if (!empty($imagem) && file_exists("../uploads/" . $pasta . '/' . $imagem)) {
            unlink("../uploads/" . $pasta . '/' . $imagem);
        }

        if (!empty($imagem_webp) && file_exists("../uploads/" . $pasta . '/' . $imagem_webp)) {
            unlink("../uploads/" . $pasta . '/' . $imagem_webp);
        }

        if (!empty($thumb) && file_exists("../uploads/" . $pasta . '/' . $thumb)) {
            unlink("../uploads/" . $pasta . '/' . $thumb);
        }
    }
}
