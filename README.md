### Casar Thoughts

Repositório do projeto de teste técnico da Casar.com.

#### Documentação

A Documentação da API pode ser acessada por esse arquivo abaixo.

[Documentação da API](DOC.md)

Ao inicializar a aplicação, é possível utilizar o Swagger para testar os Endpoints.

Endereço padrão: `http://localhost:3000/api`

### DER (Diagrama Entidade Relacionamento)

![Image](https://github.com/user-attachments/assets/13d8130e-9683-4e6a-832c-d9619b631403)

### Crítica

#### Possíveis Melhorias

Melhoraria as Queries, acredito que poderiam ser otimizadas e simplificadas sem precisar de ORM para alguns Selects com joins, por exemplo.

Algumas interfaces (typescript) poderiam ser separadas dos arquivos de entidades do TypeORM, para gerar ainda mais desacoplamento.

Quanto aos testes, com mais tempo disponível eu faria TDD, para facilitar os testes conforme o desenvolvimento flui e as necessidades de retrabalho, refatoração surgem.

#### Escalabilidade

Acredito que com muitos usuários as primeiras partes a apresentar problemas seriam as de feed e posts. Por estar com alguns relacionamentos que vão exigir mais esforço computacional para buscar os dados.

Utilizaria escalamento horizontal para criar mais instâncias/containers quando necessário, geralmente Kubernetes é uma boa opção para isso.

Seria interessante utilizar uma solução de Cache, como o Redis para salvar posts que frequentemente são acessados por grande parte dos usuários (Mas para isso precisaria adicionar monitoramentos, análises de dados para pegar essas métricas e o sistema definir quais seriam ideais a serem cacheados).

Como o banco de dados vai ser muito mais utilizado para leitura, utilizar replicas também seria uma ótima opção para melhorar a disponibilidade e desempenho da aplicação.
