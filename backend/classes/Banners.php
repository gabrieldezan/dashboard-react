<?php

/**
 * Classe Banners - Responsável por manipular banners no banco de dados.
 */
class Banners
{
    /**
     * Conexão com o banco de dados.
     * @var PDO
     */
    private $conn;

    // Propriedades da classe
    public $id;
    public $titulo;
    public $descricao;
    public $link;
    public $texto_botao;
    public $imagem;
    public $imagem_webp;
    public $imagem_largura;
    public $imagem_altura;
    public $thumb;
    public $thumb_largura;
    public $thumb_altura;
    public $abrir_nova_guia;
    public $posicao;
    public $status;

    /**
     * Construtor da classe.
     * @param PDO $db Conexão com o banco de dados.
     */
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * Cria um novo registro no banco de dados.
     * @return bool Retorna true em caso de sucesso, false caso contrário.
     */
    public function criar()
    {
        $query = "
            INSERT INTO banners 
                (titulo, descricao, link, texto_botao, imagem, imagem_webp, imagem_largura, imagem_altura, thumb, thumb_largura, thumb_altura, abrir_nova_guia, posicao, status) 
            VALUES 
                (:titulo, :descricao, :link, :texto_botao, :imagem, :imagem_webp, :imagem_largura, :imagem_altura, :thumb, :thumb_largura, :thumb_altura, :abrir_nova_guia, :posicao, :status)
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->texto_botao = htmlspecialchars(strip_tags($this->texto_botao));
        $this->imagem = htmlspecialchars(strip_tags($this->imagem));
        $this->imagem_webp = htmlspecialchars(strip_tags($this->imagem_webp));
        $this->thumb = htmlspecialchars(strip_tags($this->thumb));

        $this->abrir_nova_guia = $this->abrir_nova_guia ? 1 : 0;
        $this->status = $this->status ? 1 : 0;
        $this->posicao = (int)$this->posicao;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':texto_botao', $this->texto_botao);
        $stmt->bindParam(':imagem', $this->imagem);
        $stmt->bindParam(':imagem_webp', $this->imagem_webp);
        $stmt->bindParam(':imagem_largura', $this->imagem_largura);
        $stmt->bindParam(':imagem_altura', $this->imagem_altura);
        $stmt->bindParam(':thumb', $this->thumb);
        $stmt->bindParam(':thumb_largura', $this->thumb_largura);
        $stmt->bindParam(':thumb_altura', $this->thumb_altura);
        $stmt->bindParam(':abrir_nova_guia', $this->abrir_nova_guia);
        $stmt->bindParam(':posicao', $this->posicao);
        $stmt->bindParam(':status', $this->status);

        return $stmt->execute();
    }

    /**
     * Lista todos os registros, ordenados pela posição.
     * @return PDOStatement
     */
    public function ler()
    {
        $query = "SELECT * FROM banners ORDER BY posicao ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    /**
     * Busca um registro específico pelo ID.
     * @return array|false Retorna os dados do registro ou false se não encontrar.
     */
    public function lerPorId()
    {
        $query = "SELECT * FROM banners WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Atualiza os dados de um registro existente.
     * @return bool Retorna true em caso de sucesso, false caso contrário.
     */
    public function atualizar()
    {
        $query = "
            UPDATE banners SET 
                titulo = :titulo,
                descricao = :descricao,
                link = :link,
                texto_botao = :texto_botao,
                imagem = :imagem,
                imagem_webp = :imagem_webp,
                imagem_largura = :imagem_largura,
                imagem_altura = :imagem_altura,
                thumb = :thumb,
                thumb_largura = :thumb_largura,
                thumb_altura = :thumb_altura,
                abrir_nova_guia = :abrir_nova_guia,
                posicao = :posicao,
                status = :status
            WHERE
                id = :id
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->texto_botao = htmlspecialchars(strip_tags($this->texto_botao));
        $this->imagem = htmlspecialchars(strip_tags($this->imagem));
        $this->imagem_webp = htmlspecialchars(strip_tags($this->imagem_webp));
        $this->thumb = htmlspecialchars(strip_tags($this->thumb));

        $this->abrir_nova_guia = $this->abrir_nova_guia ? 1 : 0;
        $this->status = $this->status ? 1 : 0;
        $this->posicao = (int)$this->posicao;
        $this->id = (int)$this->id;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':texto_botao', $this->texto_botao);
        $stmt->bindParam(':imagem', $this->imagem);
        $stmt->bindParam(':imagem_webp', $this->imagem_webp);
        $stmt->bindParam(':imagem_largura', $this->imagem_largura);
        $stmt->bindParam(':imagem_altura', $this->imagem_altura);
        $stmt->bindParam(':thumb', $this->thumb);
        $stmt->bindParam(':thumb_largura', $this->thumb_largura);
        $stmt->bindParam(':thumb_altura', $this->thumb_altura);
        $stmt->bindParam(':abrir_nova_guia', $this->abrir_nova_guia);
        $stmt->bindParam(':posicao', $this->posicao);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    /**
     * Deleta um registro pelo ID.
     * @return bool Retorna true em caso de sucesso, false caso contrário.
     */
    public function deletar()
    {
        $query = "DELETE FROM banners WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = (int)$this->id;

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }
}