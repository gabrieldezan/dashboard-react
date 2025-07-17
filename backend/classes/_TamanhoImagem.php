<?php
class TamanhoImagens
{
    private $conn;
    private $table_name = "tamanho_imagens";

    public $id;
    public $tabela;
    public $imagem_largura;
    public $imagem_altura;
    public $thumb_largura;
    public $tumb_altura;

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    // Criar novo registro
    public function criar($tabela, $imagem_largura, $imagem_altura, $thumb_largura, $thumb_altura)
    {
        $sql = "INSERT INTO $this->table_name (tabela, imagem_largura, imagem_altura, thumb_largura, thumb_altura) 
                VALUES (:tabela, :imagem_largura, :imagem_altura, :thumb_largura, :thumb_altura)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":tabela", $tabela);
        $stmt->bindParam(":imagem_largura", $imagem_largura);
        $stmt->bindParam(":imagem_altura", $imagem_altura);
        $stmt->bindParam(":thumb_largura", $thumb_largura);
        $stmt->bindParam(":thumb_altura", $thumb_altura);
        return $stmt->execute();
    }

    // Ler todos os registros
    public function ler()
    {
        $sql = "SELECT * FROM $this->table_name";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Ler um registro por ID
    public function lerPorId()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Atualizar um registro
    public function atualizar($id, $tabela, $imagem_largura, $imagem_altura, $thumb_largura, $thumb_altura)
    {
        $sql = "UPDATE $this->table_name SET 
                    tabela = :tabela, 
                    imagem_largura = :imagem_largura, 
                    imagem_altura = :imagem_altura, 
                    thumb_largura = :thumb_largura, 
                    thumb_altura = :thumb_altura
                WHERE id_tamanho_imagens = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":tabela", $tabela);
        $stmt->bindParam(":imagem_largura", $imagem_largura);
        $stmt->bindParam(":imagem_altura", $imagem_altura);
        $stmt->bindParam(":thumb_largura", $thumb_largura);
        $stmt->bindParam(":thumb_altura", $thumb_altura);
        return $stmt->execute();
    }

    // Deletar um registro
    public function deletar($id)
    {
        $sql = "DELETE FROM $this->table_name WHERE id_tamanho_imagens = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}
