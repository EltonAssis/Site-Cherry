<?php
// processar_cadastro.php

// Define o cabeçalho para aceitar requisições do frontend (CORS)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Mudar para o domínio real em produção

// 1. Receber os dados enviados pelo JavaScript
$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['productName'] ?? null;
$preco = $data['productPrice'] ?? null;
$descricao = $data['productDescription'] ?? null;
// ... outros campos (categoria, marca, estoque, seo, etc.)

// 2. Validação básica
if (empty($nome) || empty($preco)) {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "error", "message" => "Nome e preço são obrigatórios."]);
    exit();
}

// 3. Conexão e Inserção no Banco de Dados (Exemplo com PDO)

/*
try {
    $pdo = new PDO('mysql:host=localhost;dbname=cherrydb', 'usuario', 'senha');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)");
    $stmt->execute([$nome, $preco, $descricao]);

    // 4. Resposta de sucesso
    http_response_code(201); // Created
    echo json_encode(["status" => "success", "message" => "Produto cadastrado com sucesso!", "id" => $pdo->lastInsertId()]);

} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["status" => "error", "message" => "Erro ao conectar ou inserir no banco de dados: " . $e->getMessage()]);
}
*/

// Resposta simulada
http_response_code(200);
echo json_encode(["status" => "success", "message" => "Dados recebidos para processamento (Simulação PHP)"]);

?>