/* eslint-disable cypress/no-unnecessary-waiting */
describe('pair app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('4');
    cy.get('button').click();
  });

  it('Проверка поля 4х4, в каждой клетке цифра должна быть невидима', () => {
    cy.get('.card').should('have.length', 16);
    cy.get('.card').should('be.empty');
    cy.wait(1500);
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    cy.get('ul li:first-child').click().should('be.visible');
    cy.wait(3000);
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.', () => {
    let nextClick = 1;
    let firstCardValue = '';
    let secondCardValue = '';

    function clickCards() {
      cy.get('.card').then((cards) => {
        cy.get(cards)
          .first()
          .click()
          .then((firstCard) => {
            firstCardValue = firstCard;
          });

        cy.get(cards)
          .eq(nextClick)
          .click()
          .then((secondCard) => {
            secondCardValue = secondCard;

            nextClick++;
            if (firstCardValue.text() != secondCardValue.text()) {
              cy.wait(300);
              clickCards();
            } else {
              cy.get(firstCardValue)
                .should('have.class', 'open')
                .should('be.visible');
              cy.get(secondCardValue)
                .should('have.class', 'open')
                .should('be.visible');
            }
          });
      });
    }
    clickCards();
    cy.wait(1500);
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми.', () => {
    let nextClick = 0;
    let firstCardValue = '';
    let secondCardValue = '';

    function clickCards() {
      cy.get('.card').then((cards) => {
        cy.get(cards)
          .eq(nextClick)
          .click()
          .then((firstCard) => {
            firstCardValue = firstCard;
          });

        cy.get(cards)
          .eq(nextClick + 1)
          .click()
          .then((secondCard) => {
            secondCardValue = secondCard;
            nextClick = +2;
            if (firstCardValue.text() == secondCardValue.text()) {
              cy.wait(300);
              clickCards();
            } else {
              cy.wait(300);
              cy.get(firstCardValue)
                .should('not.have.class', 'open')
                .should('be.empty');
              cy.get(secondCardValue)
                .should('not.have.class', 'open')
                .should('be.empty');
            }
          });
      });
    }
    clickCards();
    cy.wait(1500);
  });
});
