import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
//import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
     
    it('should login with valid credentials', async () => {
         await LoginPage.open()

         await LoginPage.login('a@a', 'a')

         const toastrAlert = await $('Logado');
         await expect(toastrAlert).toBeExisting(); 

         // Verifique se o texto contém a palavra 'Logado'
         const alertText = await toastrAlert.getText(); 
         expect(alertText).toContain('Logado');

        })

    // //     // await expect(SecurePage.flashAlert).toBeExisting()
    // //     // await expect(SecurePage.flashAlert).toHaveText(
    // //     //     expect.stringContaining('You logged into a secure area!'))
    // //     // await expect(SecurePage.flashAlert).toMatchSnapshot('flashAlert')
    // // })


    it('should login with invalid credentials', async () => {
        // Abre a página de login
        await LoginPage.open();
      
        // Realiza login com credenciais inválidas
        await LoginPage.login('aa', 'a');
      
        // Espera até que o alerta de erro esteja visível
        const toastrAlert = await $('.toast-error'); // Ou o seletor correto
      
        // Espera o toastr aparecer na tela
        await toastrAlert.waitForDisplayed({ timeout: 5000 }); // Espera 5 segundos
      
        // Verifica se o alerta existe
        await expect(toastrAlert).toBeExisting(); 
      
        // Obtém o texto do alerta e verifica se contém a mensagem esperada
        const alertText = await toastrAlert.getText();
        console.log('Texto do alerta:', alertText); // Para ajudar no debug
        expect(alertText).toContain('Email ou senha invalido'); // Verifica se o texto do alerta contém a mensagem
    });

    it('should login with invalid credentials', async () => {
        // Abre a página de login
        await LoginPage.open();
      
        // Realiza login com credenciais inválidas
        await LoginPage.login('', 'a');
      
        // Espera até que o alerta de erro esteja visível
        const toastrAlert = await $('.toast-error'); // Ou o seletor correto
      
        // Espera o toastr aparecer na tela
        await toastrAlert.waitForDisplayed({ timeout: 5000 }); // Espera 5 segundos
      
        // Verifica se o alerta existe
        await expect(toastrAlert).toBeExisting(); 
      
        // Obtém o texto do alerta e verifica se contém a mensagem esperada
        const alertText = await toastrAlert.getText();
        console.log('Texto do alerta:', alertText); // Para ajudar no debug
        expect(alertText).toContain('Email ou senha invalido'); // Verifica se o texto do alerta contém a mensagem
    });


    it('should login with invalid credentials', async () => {
        // Abre a página de login
        await LoginPage.open();
      
        // Realiza login com credenciais inválidas
        await LoginPage.login('aa', 'a');
      
        // Espera até que o alerta de erro esteja visível
        const toastrAlert = await $('.toast-error'); // Ou o seletor correto
      
        // Espera o toastr aparecer na tela
        await toastrAlert.waitForDisplayed({ timeout: 5000 }); // Espera 5 segundos
      
        // Verifica se o alerta existe
        await expect(toastrAlert).toBeExisting(); 
      
        // Obtém o texto do alerta e verifica se contém a mensagem esperada
        const alertText = await toastrAlert.getText();
        console.log('Texto do alerta:', alertText); // Para ajudar no debug
        expect(alertText).toContain('Email ou senha invalido'); // Verifica se o texto do alerta contém a mensagem
    });


})

