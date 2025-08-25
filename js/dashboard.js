document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica de navegação por abas (mantida do código anterior)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 2. Função para simular a busca de dados de uma API
    function fetchData() {
        // Dados de exemplo, que seriam retornados de um servidor PHP/API
        const data = {
            vendasHoje: {
                valor: (Math.random() * 5000).toFixed(2),
                porcentagem: (Math.random() * 20).toFixed(0),
                tendencia: Math.random() > 0.5 ? 'up' : 'down'
            },
            vendasMes: {
                valor: (Math.random() * 50000).toFixed(2),
                porcentagem: (Math.random() * 10).toFixed(0),
                tendencia: Math.random() > 0.5 ? 'up' : 'down'
            },
            usuariosAtivos: {
                valor: (Math.random() * 2000).toFixed(0),
                porcentagem: (Math.random() * 15).toFixed(0),
                tendencia: Math.random() > 0.5 ? 'up' : 'down'
            },
            produtosEstoque: {
                valor: (Math.random() * 500).toFixed(0),
                porcentagem: (Math.random() * 5).toFixed(0),
                tendencia: Math.random() > 0.5 ? 'up' : 'down'
            },
            topProdutos: [
                { nome: 'Vibrador Cherry Passion', vendas: (Math.random() * 200).toFixed(0) },
                { nome: 'Óleo Massagem Sensual', vendas: (Math.random() * 150).toFixed(0) },
                { nome: 'Lingerie Cereja Selvagem', vendas: (Math.random() * 120).toFixed(0) },
                { nome: 'Kit Fantasias Românticas', vendas: (Math.random() * 100).toFixed(0) },
                { nome: 'Gel Lubrificante Cherry', vendas: (Math.random() * 90).toFixed(0) }
            ],
            pedidosRecentes: [
                { id: 'CH8945', cliente: 'Maria Silva', data: '15/06/2023', valor: (Math.random() * 300).toFixed(2), status: 'completed' },
                { id: 'CH8944', cliente: 'João Santos', data: '15/06/2023', valor: (Math.random() * 200).toFixed(2), status: 'processing' },
                { id: 'CH8943', cliente: 'Ana Oliveira', data: '14/06/2023', valor: (Math.random() * 400).toFixed(2), status: 'completed' },
                { id: 'CH8942', cliente: 'Carlos Mendes', data: '14/06/2023', valor: (Math.random() * 100).toFixed(2), status: 'cancelled' },
                { id: 'CH8941', cliente: 'Juliana Costa', data: '13/06/2023', valor: (Math.random() * 250).toFixed(2), status: 'completed' }
            ]
        };

        return data;
    }

    // 3. Função para renderizar as estatísticas
    function renderStats() {
        const stats = fetchData();

        // Atualiza os cards
        document.querySelector('[data-stat="vendas-hoje"]').textContent = `R$ ${stats.vendasHoje.valor.replace('.', ',')}`;
        document.querySelector('[data-change="vendas-hoje"]').textContent = `-${stats.vendasHoje.porcentagem}% desde ontem`;
        document.querySelector('[data-change="vendas-hoje"]').className = `change ${stats.vendasHoje.tendencia}`;

        document.querySelector('[data-stat="vendas-mes"]').textContent = `R$ ${stats.vendasMes.valor.replace('.', ',')}`;
        document.querySelector('[data-change="vendas-mes"]').textContent = `+${stats.vendasMes.porcentagem}% desde o mês passado`;
        document.querySelector('[data-change="vendas-mes"]').className = `change ${stats.vendasMes.tendencia}`;

        document.querySelector('[data-stat="usuarios-ativos"]').textContent = stats.usuariosAtivos.valor;
        document.querySelector('[data-change="usuarios-ativos"]').textContent = `+${stats.usuariosAtivos.porcentagem}% desde a semana passada`;
        document.querySelector('[data-change="usuarios-ativos"]').className = `change ${stats.usuariosAtivos.tendencia}`;

        document.querySelector('[data-stat="produtos-estoque"]').textContent = stats.produtosEstoque.valor;
        document.querySelector('[data-change="produtos-estoque"]').textContent = `-${stats.produtosEstoque.porcentagem}% desde a semana passada`;
        document.querySelector('[data-change="produtos-estoque"]').className = `change ${stats.produtosEstoque.tendencia}`;

        // Atualiza a lista de produtos mais vendidos
        const topProductsList = document.getElementById('top-products-list');
        topProductsList.innerHTML = stats.topProdutos.map(p => 
            `<li><span>${p.nome}</span> <span>${p.vendas} un.</span></li>`
        ).join('');
        
        // Atualiza a tabela de pedidos
        const ordersTableBody = document.querySelector('#recent-orders-table tbody');
        ordersTableBody.innerHTML = stats.pedidosRecentes.map(p => 
            `<tr>
                <td><a href="#">#${p.id}</a></td>
                <td>${p.cliente}</td>
                <td>${p.data}</td>
                <td>R$ ${p.valor.replace('.', ',')}</td>
                <td><span class="status ${p.status}">${p.status === 'completed' ? 'Concluído' : p.status === 'processing' ? 'Em processamento' : 'Cancelado'}</span></td>
                <td><i class="fas fa-ellipsis-v"></i></td>
            </tr>`
        ).join('');
    }

    // Executa a função para carregar os dados
    renderStats();

    // Configura o formulário de cadastro (mantido do código anterior)
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Dados enviados para o servidor.");
            alert("Produto enviado para processamento!");
        });
    }
});