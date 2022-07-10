# Valex API - Documentation

## CARDS - Creation

```javascript
  {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  }
```

- [ ] Receber api key da empresa via header -> `x-api-key`

- [ ] Receber `employeeId` via body e validar se pertence a um funcionário cadastrado

- [ ] Receber `cardType` via body e validar se pertence a um tipo de cartão cadastrado

- [ ] Os tipos de cartão são:

  - groceries;
  - restaurants;
  - transport;
  - education;
  - health.

- [ ] Validar que o funcionário não possui nenhum cartão do tipo informado criado anteriormente

- [ ] Gerar numero do cartão utilizando faker -> https://www.npmjs.com/package/faker

- [ ] O nome no cartão deve estar no formato `primeiro nome + iniciais de nomes do meio + ultimo nome` (tudo em caixa alta).

  - Considere nomes do meio apenas nomes que possuírem 3 letras ou mais
  - Ex: para o nome José da Silva Rodrigues o seguinte nome deverá ser gerado
  - `JOSÉ S RODRIGUES`

- [ ] A data de expiração deverá ser o dia atual 5 anos a frente e no formato `MM/YY`

  - Ex: para a data `02/04/2022` a seguinte data de expiração deverá ser gerada
  - `04/27`

- [ ] O código de segurança (CVC) deverá ser persistido de forma criptografada por ser um dado sensível
  - Utilize a biblioteca [faker](https://fakerjs.dev/guide/#overview) para gerar o CVC
  - Utilize a biblioteca cryptr para lidar com criptografia

## CARDS - Activation
