<?php

/**
 * Classe Enderecos - Responsável por manipular enderecos no banco de dados.
 */
class Enderecos
{
    /**
     * Conexão com o banco de dados.
     * @var PDO
     */
    private $conn;

    // Propriedades da classe
    public $id;
    public $titulo;
    public $endereco;
    public $cidade;
    public $estado;
    public $mapa;
    public $link;
    public $horario_atendimento;
    public $telefone;
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
            INSERT INTO enderecos 
                (titulo, endereco, cidade, estado, mapa, link, horario_atendimento, telefone, status) 
            VALUES 
                (:titulo, :endereco, :cidade, :estado, :mapa, :link, :horario_atendimento, :telefone, :status)
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->endereco = htmlspecialchars(strip_tags($this->endereco));
        $this->cidade = htmlspecialchars(strip_tags($this->cidade));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->mapa = htmlspecialchars(strip_tags($this->mapa));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->horario_atendimento = htmlspecialchars(strip_tags($this->horario_atendimento));
        $this->telefone = htmlspecialchars(strip_tags($this->telefone));
        $this->status = $this->status ? 1 : 0;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':endereco', $this->endereco);
        $stmt->bindParam(':cidade', $this->cidade);
        $stmt->bindParam(':estado', $this->estado);
        $stmt->bindParam(':mapa', $this->mapa);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':horario_atendimento', $this->horario_atendimento);
        $stmt->bindParam(':telefone', $this->telefone);
        $stmt->bindParam(':status', $this->status);

        return $stmt->execute();
    }

    /**
     * Lista todos os registros, ordenados pela posição.
     * @return PDOStatement
     */
    public function ler()
    {
        $query = "SELECT * FROM enderecos";
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
        $query = "SELECT * FROM enderecos WHERE id = ? LIMIT 1";
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
            UPDATE enderecos SET 
                titulo = :titulo,
                endereco = :endereco,
                cidade = :cidade,
                estado = :estado,
                mapa = :mapa,
                link = :link,
                horario_atendimento = :horario_atendimento,
                telefone = :telefone,
                status = :status
            WHERE
                id = :id
        ";

        $stmt = $this->conn->prepare($query);

        // Sanitização
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->endereco = htmlspecialchars(strip_tags($this->endereco));
        $this->cidade = htmlspecialchars(strip_tags($this->cidade));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->mapa = htmlspecialchars(strip_tags($this->mapa));
        $this->link = htmlspecialchars(strip_tags($this->link));
        $this->horario_atendimento = htmlspecialchars(strip_tags($this->horario_atendimento));
        $this->telefone = htmlspecialchars(strip_tags($this->telefone));
        $this->id = (int)$this->id;

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':endereco', $this->endereco);
        $stmt->bindParam(':cidade', $this->cidade);
        $stmt->bindParam(':estado', $this->estado);
        $stmt->bindParam(':mapa', $this->mapa);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':horario_atendimento', $this->horario_atendimento);
        $stmt->bindParam(':telefone', $this->telefone);
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
        $query = "DELETE FROM enderecos WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = (int)$this->id;

        $stmt->bindParam(1, $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }
}
