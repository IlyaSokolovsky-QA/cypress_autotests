import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашли на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восс. пароль
    })

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
       });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login); // Ввели верный логин
         cy.get(main_page.password).type(data.password); // Ввели верный пароль
         cy.get(main_page.login_button).click(); // Нажал войти

         cy.wait(5000);

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авт. вижу текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
         
    })


it('верный логин и неверный пароль', function () {
    cy.get(main_page.email).type(data.login); // Ввели верный логин
    cy.get(main_page.password).type('iLoveqastudio7'); // Ввели неверный пароль
    cy.get(main_page.login_button).click(); // Нажал войти

    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авт. вижу текст
    cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    
})

it('Неверный логин и верный пароль', function () { 
    cy.get(main_page.email).type('gfgfgfgfgfgferman@dolnikov.ru'); // Ввели не верный логин
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); // Нажал войти

    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авт. вижу текст
    cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    
})

it('Проверка что в логине есть @', function () {
    cy.get(main_page.email).type('germandolnikov.ru'); // Ввел логин без @
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); // Нажал войти

    cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю что после авт. вижу текст
    cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    
})

it('Проверка восстановления пароля', function () {
    cy.get(main_page.fogot_pass_btn).click(); // Нажимаю восстановить пароль
    cy.get(recovery_page.email).type(data.login); // Ввел почту для восстановления 
    cy.get(recovery_page.send_button).click(); // Нажал отправить код

    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
    cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    
})

it('Проверка восстановления пароля несуществующим E-mail', function () {
    cy.get(main_page.fogot_pass_btn).click(); // Нажимаю восстановить пароль
    cy.get(recovery_page.email).type('gfgfgfgfgfgferman@dolnikov.ru'); // Ввел несуществующую почту для восстановления 
    cy.get(recovery_page.send_button).click(); // Нажал отправить код

    cy.get(recovery_page.title).contains('Такого E-mail не существует'); // Проверяю на совпадение текст
    cy.get(recovery_page.title).should('be.visible'); // Текст виден пользователю
    
})

it('Верный пароль и верный логин с использованием строчных букв', function () {
    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели верный логин с использованием строчных букв
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); // Нажал войти

    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авт. вижу текст
    cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    
})

})