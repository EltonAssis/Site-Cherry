document.addEventListener('DOMContentLoaded', () => {

    const cartCountElement = document.querySelector('.cart-count');

    // Função para atualizar o contador do carrinho no HTML
    function updateCartCount(count) {
        cartCountElement.textContent = count;
    }

    // Função para carregar a contagem inicial do carrinho
    function loadInitialCartCount() {
        fetch('carrinho.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'info' && data.totalItems !== undefined) {
                    updateCartCount(data.totalItems);
                }
            })
            .catch(error => console.error('Erro ao carregar a contagem do carrinho:', error));
    }

    // Carrega a contagem inicial ao abrir a página
    loadInitialCartCount();

    // --- Funcionalidade das Abas (Tabs) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');

            const targetTabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- Seleção de Cores e Tamanhos ---
    const colorOptions = document.querySelectorAll('#color-options .option-button');
    const sizeOptions = document.querySelectorAll('#size-options .option-button');

    function handleOptionSelection(options) {
        options.forEach(button => {
            button.addEventListener('click', () => {
                options.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    handleOptionSelection(colorOptions);
    handleOptionSelection(sizeOptions);

    // --- Contador de Quantidade ---
    const quantityInput = document.querySelector('.quantity-input');
    const quantityBtns = document.querySelectorAll('.quantity-btn');

    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            const action = btn.getAttribute('data-action');

            if (action === 'increase') {
                quantityInput.value = currentValue + 1;
            } else if (action === 'decrease' && currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    });

    // --- Botões de Ação (Adicionar e Comprar) ---
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');

    function getSelectedOptions() {
        const selectedColor = document.querySelector('#color-options .option-button.active')?.getAttribute('data-value');
        const selectedSize = document.querySelector('#size-options .option-button.active')?.getAttribute('data-value');
        const quantity = quantityInput.value;
        const productId = "PROD123"; // Exemplo de ID do produto
        
        if (!selectedColor || !selectedSize) {
            alert('Por favor, selecione uma cor e um tamanho.');
            return null;
        }

        return {
            id: productId,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity
        };
    }

    addToCartBtn.addEventListener('click', () => {
        const product = getSelectedOptions();
        if (product) {
            const dataToSend = {
                action: 'add_to_cart',
                productId: product.id,
                color: product.color,
                size: product.size,
                quantity: product.quantity
            };

            fetch('carrinho.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    if (data.totalItems !== undefined) {
                        updateCartCount(data.totalItems);
                    }
                } else {
                    alert('Erro ao adicionar ao carrinho: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                alert('Não foi possível se conectar ao servidor.');
            });
        }
    });

    buyNowBtn.addEventListener('click', () => {
        const product = getSelectedOptions();
        if (product) {
            alert(`Comprando agora:\n- Cor: ${product.color}\n- Tamanho: ${product.size}\n- Quantidade: ${product.quantity}`);
        }
    });
});