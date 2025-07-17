<?php

/**
 * Classe Sobre - Responsável por manipular sobre no banco de dados.
 */
class Sobre
{
    /**
     * Conexão com o banco de dados.
     * @var PDO
     */
    private $conn;

    // Propriedades da classe
    public $titulo;
    public $resumo;
    public $texto;
    public $imagem;
    public $imagem_webp;
    public $imagem_largura;
    public $imagem_altura;
    public $thumb;
    public $thumb_largura;
    public $thumb_altura;
    public $link;

    /**
     * Construtor da classe.
     * @param PDO $db Conexão com o banco de dados.
     */
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * Busca o único registro disponível da tabela.
     * @return array|false Retorna os dados do registro ou false se não encontrar.
     */
    public function ler()
    {
        $query = "SELECT * FROM sobre LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Atualiza o único registro da tabela.
     * @return bool Retorna true em caso de sucesso, false caso contrário.
     */
    public function atualizar()
    {
        $query = "
            UPDATE sobre SET 
                titulo = :titulo,
                resumo = :resumo,
                texto = :texto,
                imagem = :imagem,
                imagem_webp = :imagem_webp,
                imagem_largura = :imagem_largura,
                imagem_altura = :imagem_altura,
                thumb = :thumb,
                thumb_largura = :thumb_largura,
                thumb_altura = :thumb_altura,
                link = :link
            LIMIT 1
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização apenas nos campos que serão exibidos no HTML
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->resumo = htmlspecialchars(strip_tags($this->resumo));
        $this->link = htmlspecialchars(strip_tags($this->link));

        // Conversão de campos numéricos
        $this->imagem_largura = (int) $this->imagem_largura;
        $this->imagem_altura = (int) $this->imagem_altura;
        $this->thumb_largura = (int) $this->thumb_largura;
        $this->thumb_altura = (int) $this->thumb_altura;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':resumo', $this->resumo);
        $stmt->bindParam(':texto', $this->texto);
        $stmt->bindParam(':imagem', $this->imagem);
        $stmt->bindParam(':imagem_webp', $this->imagem_webp);
        $stmt->bindParam(':imagem_largura', $this->imagem_largura);
        $stmt->bindParam(':imagem_altura', $this->imagem_altura);
        $stmt->bindParam(':thumb', $this->thumb);
        $stmt->bindParam(':thumb_largura', $this->thumb_largura);
        $stmt->bindParam(':thumb_altura', $this->thumb_altura);
        $stmt->bindParam(':link', $this->link);

        return $stmt->execute();
    }
}