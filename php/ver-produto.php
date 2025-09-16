<?php
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$totalItemsInCart = 0;
foreach ($_SESSION['cart'] as $item) {
    $totalItemsInCart += $item['quantity'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action']) && $data['action'] === 'add_to_cart') {
        $productId = isset($data['productId']) ? $data['productId'] : 'N/A';
        $color = isset($data['color']) ? $data['color'] : 'N/A';
        $size = isset($data['size']) ? $data['size'] : 'N/A';
        $quantity = isset($data['quantity']) ? (int)$data['quantity'] : 1;

        $_SESSION['cart'][] = [
            'id' => $productId,
            'color' => $color,
            'size' => $size,
            'quantity' => $quantity
        ];
        
        $totalItemsInCart = 0;
        foreach ($_SESSION['cart'] as $item) {
            $totalItemsInCart += $item['quantity'];
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'Produto adicionado ao carrinho com sucesso!',
            'totalItems' => $totalItemsInCart
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ação inválida.']);
    }
} else {
    echo json_encode([
        'status' => 'info',
        'totalItems' => $totalItemsInCart
    ]);
}
?>