# Atividade prática

# 1 - Fazer um fork do projeto
No canto superior direito da tela do github há um botão `fork`. Clique nele
para criar uma cópia local no seu próprio github. Com isso, você conseguirá
utilizar todo o conteúdo existente e promover alterações no código sem que
impacte nos demais projetos.

# 2 - Analisar o código existente para a criação de um novo modelo

Analise cuidadosamente os componentes existentes (modelos, controllers, rotas)
para que você consiga realizar essa tarefa.

# 3 - Criar um novo modelo Produto

Aqui, você vai criar um modelo `Produto` de forma a armazenar os produtos que
serão usados em um restaurante para exibir o cardápio.

Esses produtos terão os seguintes atributos:
```
{
  nome: string,
  descricao: string,
  quantidadeEstoque: number,
  preco: number,
  precoPromocional:number,
  precoPromoAtivado: boolean,
  tipo:string
}
```
# 4 - Crie um novo controller

Deverá conter os seguintes métodos: `criar`, `listar`, `buscar` e `deletar`

# 5 - Crie novas rotas

| Método | Caminho            | Descrição                | 
|--------|--------------------|--------------------------| 
| POST   | '/produto/new'     | Novo produto             | 
| GET    | '/produto/list'    | listar produtos          | 
| GET    | '/produto/list/:id'| buscar um produto com id | 
| POST   | 'produto/del/:id'  | deletar produto com id   | 

