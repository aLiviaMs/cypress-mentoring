/**
 * Arrange - Preparação
 * Act - Ação
 * Assert - Validação do resultado (asserção)
 */
describe('Testando a página', () => {
  // hooks, executam antes ou depois de todos os testes.

  beforeEach(() => {
    // ARRANGE
    cy.visit('/');
  });

  it('Cadastrar uma entrada de valor', () => {
    // Forma 1 de pegar elementos;
    cy.contains('Nova Transação').click();
    // Forma 2 de pegar elementos;
    cy.get('#description').type('Transação nova');
    cy.get('#amount').type('250');

    // o proximo é de um tipo input date, diferente
    // por ele ser do tipo date, posso passar direto para o cypress, uma data direta
    // só que precisa passar de um jeito especifico para o cypress
    cy.get('#date').type('2024-05-09');

    // AQui a gente pode fazer uma mescla tbm, com contains e seletor.
    // Quero que selecione um dos BOTÕES que tem na aplicação, que contenha o texto Salvar
    cy.contains('button', 'Salvar').click();

    // Agora vamos falar um pouco sobre asserçẽos com o cypress.
    // UM ponto que eu gosto de falar é que o cypress tem muias opções de asserções

    // ASSERT
    cy.get('tbody tr td.description').should('have.text', 'Transação nova')
  })

  // Qual vai ser a diferença de uma entrada e uma saida, 
  // entre esses 2 testes?
  // Basicamente pra ter a saída eu vou ter que criar a transação, certo?
  // E depois eu vou conseguir exclui-la
  // E pra não repetir, de novo toda a estrutura a gente já pode da uma refatorada nos nossos testes
  // Criando uma função auxiliar
  it('Cadastrar uma saída de valor', () => {
    // ARRANGE 
    const desc = 'Transação nova';
    cy.visit('/');

    // ACT
    createTransaction(desc, '-20')

    // ASSERT
    cy.get('tbody tr td.description').should('have.text', 'Transação nova')
  })

  // Substrituição do primeiro teste:
  it('Cadastrar uma entrada de valor REFATORADA', () => {
    // ARRANGE
    const desc = 'Transação nova';
    cy.visit('/');

    // ACT
    createTransaction(desc, '120')

    // ASSERT
    cy.get('tbody tr td.description').should('have.text', desc)
  })

  it('Excluir uma transação', () => {
    // ARRANGE
    const desc = 'Transação nova';

    // ACT
    createTransaction(desc, '100')
    createTransaction('Outra transação', '10')
    cy.get('tbody tr').should('have.length', 2);
    cy.contains('.description', desc).parent().find('img').click();

    //outra forma
    // createTransaction(desc, '100');
    // createTransaction('Outra coisa', '10');
    // cy.contains('.decription', desc).siblings().children('img').click();

    // ASSERT
    // cy.get('tbody tr').should('have.length', 1);
  })
})


function createTransaction(desc: string, value: string): void {
  cy.contains('Nova Transação').click();
  cy.get('#description').type(desc);
  cy.get('#amount').type(value);
  cy.get('#date').type('2024-05-09');
  cy.contains('button', 'Salvar').click();
}