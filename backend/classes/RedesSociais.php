<?php

/**
 * Classe RedesSociais - Responsável por manipular redes_sociais no banco de dados.
 */
class RedesSociais
{
    /**
     * Conexão com o banco de dados.
     * @var PDO
     */
    private $conn;

    // Propriedades da classe
    public $id;
    public $titulo;
    public $link;
    public $icone; 
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
            INSERT INTO redes_sociais 
                (titulo, link, icone, status) 
            VALUES 
                (:titulo, :link, :icone, :status)
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->icone = htmlspecialchars(strip_tags($this->icone));
        $this->status = $this->status ? 1 : 0;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':icone', $this->icone);
        $stmt->bindParam(':status', $this->status);

        return $stmt->execute();
    }

    /**
     * Lista todos os registros, ordenados pela posição.
     * @return PDOStatement
     */
    public function ler()
    {
        $query = "SELECT * FROM redes_sociais";
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
        $query = "SELECT * FROM redes_sociais WHERE id = ? LIMIT 1";
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
            UPDATE redes_sociais SET 
                titulo = :titulo,
                link = :link,
                icone = :icone,
                status = :status
            WHERE
                id = :id
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->icone = htmlspecialchars(strip_tags($this->icone));
        $this->status = $this->status ? 1 : 0;
        $this->id = (int)$this->id;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':icone', $this->icone);
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
        $query = "DELETE FROM redes_sociais WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = (int)$this->id;

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }
}