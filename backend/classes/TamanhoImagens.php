<?php

/**
 * Classe TamanhoImagens - Responsável por manipular tamanho_imagens no banco de dados.
 */
class TamanhoImagens
{
    /**
     * Conexão com o banco de dados.
     * @var PDO
     */
    private $conn;

    // Propriedades da classe
    public $id;
    public $tabela;
    public $imagem_largura;
    public $imagem_altura;
    public $thumb_largura;
    public $thumb_altura;

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
            INSERT INTO tamanho_imagens 
                (tabela, imagem_largura, imagem_altura, thumb_largura, thumb_altura) 
            VALUES 
                (:tabela, :imagem_largura, :imagem_altura, :thumb_largura, :thumb_altura)
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->tabela = htmlspecialchars(strip_tags($this->tabela));
        $this->imagem_largura = htmlspecialchars(strip_tags($this->imagem_largura));
        $this->imagem_altura = htmlspecialchars(strip_tags($this->imagem_altura));
        $this->thumb_largura = htmlspecialchars(strip_tags($this->thumb_largura));
        $this->thumb_altura = htmlspecialchars(strip_tags($this->thumb_altura));

        // Bind dos parâmetros
        $stmt->bindParam(':tabela', $this->tabela);
        $stmt->bindParam(':imagem_largura', $this->imagem_largura);
        $stmt->bindParam(':imagem_altura', $this->imagem_altura);
        $stmt->bindParam(':thumb_largura', $this->thumb_largura);
        $stmt->bindParam(':thumb_altura', $this->thumb_altura);

        return $stmt->execute();
    }

    /**
     * Lista todos os registros, ordenados pela posição.
     * @return PDOStatement
     */
    public function ler()
    {
        $query = "SELECT * FROM tamanho_imagens";
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
        $query = "SELECT * FROM tamanho_imagens WHERE id = ? LIMIT 1";
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
            UPDATE tamanho_imagens SET 
                tabela = :tabela,
                imagem_largura = :imagem_largura,
                imagem_altura = :imagem_altura,
                thumb_largura = :thumb_largura,
                thumb_altura = :thumb_altura
            WHERE
                id = :id
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->tabela = htmlspecialchars(strip_tags($this->tabela));
        $this->imagem_largura = htmlspecialchars(strip_tags($this->imagem_largura));
        $this->imagem_altura = htmlspecialchars(strip_tags($this->imagem_altura));
        $this->thumb_largura = htmlspecialchars(strip_tags($this->thumb_largura));
        $this->thumb_altura = htmlspecialchars(strip_tags($this->thumb_altura));
        $this->id = (int)$this->id;

        // Bind dos parâmetros
        $stmt->bindParam(':tabela', $this->tabela);
        $stmt->bindParam(':imagem_largura', $this->imagem_largura);
        $stmt->bindParam(':imagem_altura', $this->imagem_altura);
        $stmt->bindParam(':thumb_largura', $this->thumb_largura);
        $stmt->bindParam(':thumb_altura', $this->thumb_altura);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    /**
     * Deleta um registro pelo ID.
     * @return bool Retorna true em caso de sucesso, false caso contrário.
     */
    public function deletar()
    {
        $query = "DELETE FROM tamanho_imagens WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = (int)$this->id;

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }
}
