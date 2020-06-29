### **movies-api**

#### Iniciando a aplicação:
Execute:
`npm run build-docker-image`
`npm run docker:up`

#### Executando testes:
Todos:
`npm run test`

Unitários:
`npm run test:unit`

Funcionais
`npm run test:functional`
_______________________________________________________________

##### **Porque utilizar _factories_?**
R1: Inverter a criação das dependências. Seguindo o **D** do SOLI**D**
R2: Possibilita a injeção de "mocks", que viabiliza os testes unitários de cada método, já que todas as requisições as dependências estão mockadas.

##### **Porque utilizar o mongoDb?**
R: A intenção era passar toda a responsabilidade de validação de modelo ao código. Caso utilizasse o SQL, a responsabilidade de verificar se todos os campos existem, ou se o nome do filme já existe, também existiria "automaticamente" ao criar a tabela com os determinados campos, e FK no nome.

##### **Porque apenas testes unitários e funcionais?**
R1: De fato, os testes unitários estão cobrindo apenas as unidades de código. Completamente indispensável.
R2: Como é um fluxo simples e sem integrações, os testes funcionais garantem as funcionalidades do código (somente duas). Caso uma delas falhe, a única **integração** que existe (que é com o DB) automaticamente falharia. Cobrindo este cenário.
R3: Não há um "fluxo" dentro do sistema para assegurar uma "jornada de usuário" coberta pelo teste e2e. O testes funcionais, caso passem todos, garantem o funcionamento complexo do sistema.


Busquei atender os princípios [F.I.R.S.T](https://medium.com/@tasdikrahman/f-i-r-s-t-principles-of-testing-1a497acda8d6), [S.O.L.I.D](https://pt.wikipedia.org/wiki/SOLID) e [Clean Code](https://medium.com/desenvolvendo-com-paixao/1-clean-code-o-que-%C3%A9-porque-usar-1e4f9f4454c6)