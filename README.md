# Casar Thoughts

Repositório do projeto de teste técnico da Casar.com.

## Instruções de uso

Para executar esse projeto, siga os passos:

```bash
git clone git@github.com:lamecksilva/casar-thoughts-api.git`
cd casar-thoughts-api
docker-compose up
```

As imagens serão baixadas e a API será acessível na porta 3000.

## Documentação

A Documentação da API pode ser acessada por esse arquivo abaixo.

[Documentação da API](DOC.md)

Ao inicializar a aplicação, é possível utilizar o Swagger para testar os Endpoints.

Endereço padrão: `http://localhost:3000/api`

## DER (Diagrama Entidade Relacionamento)

![Image](https://github.com/user-attachments/assets/13d8130e-9683-4e6a-832c-d9619b631403)

### Crítica

> Reflita sobre este projeto e escreva o que você melhoraria se tivesse mais tempo.

#### Possíveis Melhorias

Melhoraria as Queries, acredito que poderiam ser otimizadas e simplificadas sem precisar de ORM para alguns Selects com joins, por exemplo.

Algumas interfaces (typescript) poderiam ser separadas dos arquivos de entidades do TypeORM, para gerar ainda mais desacoplamento.

Quanto aos testes, com mais tempo disponível eu faria TDD, para facilitar os testes conforme o desenvolvimento flui e as necessidades de retrabalho, refatoração surgem.

E novamente dos testes, adicionar um postgres em memória para testar os módulos que conectam entidades do TypeORM com o banco.

#### Escalabilidade

> Escreva sobre a escalabilidade. Se este projeto crescesse e tivesse muitos usuários e
> postagens, quais partes você acha que falhariam primeiro? Em uma situação real, quais
> etapas você tomaria para escalar este produto? Que outros tipos de tecnologia e
> infraestrutura você poderia precisar usar?

Acredito que com muitos usuários as primeiras partes a apresentar problemas seriam as de feed e posts. Por estar com alguns relacionamentos que vão exigir mais esforço computacional para buscar os dados.

Utilizaria escalamento horizontal para criar mais instâncias/containers quando necessário, geralmente Kubernetes é uma boa opção para isso.

Seria interessante utilizar uma solução de Cache, como o Redis para salvar posts que frequentemente são acessados por grande parte dos usuários (Mas para isso precisaria adicionar monitoramentos, análises de dados para pegar essas métricas e o sistema definir quais seriam ideais a serem cacheados).

Como o banco de dados vai ser muito mais utilizado para leitura, utilizar replicas também seria uma ótima opção para melhorar a disponibilidade e desempenho da aplicação.

### Agradecimentos

Desde já agradeço a oportunidade de realizar este processo seletivo. Desde a entrevista técnica já foi de MUITA valia pelos feedbacks que recebi e vi pontos a serem melhorados, o que me animou e incentivou a estudar mais.

E se possível, gostaria de receber feedbacks sobre esse projeto, onde posso melhorar, pontos do código, arquitetura, boas práticas para ajudar na minha jornada de me tornar um profissional mais qualificado, Muito obrigado!
