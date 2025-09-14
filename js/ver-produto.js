document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidade das Abas de Conteúdo ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');

            // Exibe o conteúdo correspondente
            // Nota: O HTML precisa ter um ID ou data-attribute para corresponder ao botão
            // Neste exemplo, vamos usar a ordem para simplificar
            const tabIndex = Array.from(tabButtons).indexOf(button);
            tabContents[tabIndex].classList.add('active');
        });
    });

    // --- Seleção de Cores e Tamanhos ---
    const colorButtons = document.querySelectorAll('.product-options .option-group:nth-of-type(1) .option-button');
    const sizeButtons = document.querySelectorAll('.product-options .option-group:nth-of-type(2) .option-button');

    // Função genérica para lidar com a seleção
    function handleOptionSelection(buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões do mesmo grupo
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe 'active' ao botão clicado
                button.classList.add('active');
            });
        });
    }

    handleOptionSelection(colorButtons);
    handleOptionSelection(sizeButtons);

    // --- Contador de Quantidade ---
    const quantityInput = document.querySelector('.quantity-input');
    const quantityIncreaseBtn = document.querySelector('.quantity-btn:nth-of-type(2)');
    const quantityDecreaseBtn = document.querySelector('.quantity-btn:nth-of-type(1)');

    quantityIncreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    quantityDecreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // --- Ações dos Botões de Compra ---
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');

    addToCartBtn.addEventListener('click', () => {
        // Lógica para adicionar ao carrinho (pode usar PHP para isso)
        const selectedColor = document.querySelector('.product-options .option-group:nth-of-type(1) .option-button.active')?.textContent.trim();
        const selectedSize = document.querySelector('.product-options .option-group:nth-of-type(2) .option-button.active')?.textContent.trim();
        const quantity = quantityInput.value;

        if (!selectedColor || !selectedSize) {
            alert('Por favor, selecione uma cor e um tamanho.');
            return;
        }

        alert(`Produto adicionado ao carrinho!\nCor: ${selectedColor}\nTamanho: ${selectedSize}\nQuantidade: ${quantity}`);
        // Aqui você enviaria os dados para o PHP através de uma requisição AJAX (fetch)
    });

    buyNowBtn.addEventListener('click', () => {
        // Lógica para ir para a página de checkout (pode usar PHP para isso)
        alert('Redirecionando para a página de checkout...');
        // window.location.href = 'checkout.php';
    });

});