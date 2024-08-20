import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

  questions = questions;

  toggle(i : any) {
    this.questions[i].open = !this.questions[i].open;
  }
}

export const questions = [
  {
    query: 'Como posso acessar a plataforma Health Training?',
    answer: 'Você pode acessar a plataforma através do nosso site oficial. Se ainda não possui uma conta, você pode se registrar fornecendo seus dados básicos e seguindo as instruções de configuração.',
    open: false
  },
  {
    query: 'Quais dispositivos são compatíveis com a plataforma?',
    answer: 'Nossa plataforma é compatível com a maioria dos dispositivos modernos, incluindo desktops, laptops, tablets e smartphones, com suporte para os principais navegadores web.',
    open: false
  },
  {
    query: 'Como posso recuperar minha senha esquecida?',
    answer: 'Para recuperar sua senha, clique em "Esqueceu a senha?" na página de login e siga as instruções para redefini-la usando seu e-mail cadastrado.',
    open: false
  },
  {
    query: 'É possível acompanhar meu progresso no treinamento?',
    answer: 'Sim, a plataforma possui um sistema de acompanhamento de progresso que permite visualizar as etapas completadas e as que ainda precisam ser concluídas.',
    open: false
  },
  {
    query: 'O que devo fazer se encontrar um bug na plataforma?',
    answer: 'Se você encontrar qualquer tipo de erro ou problema técnico, por favor, reporte imediatamente através do nosso formulário de contato ou e-mail de suporte técnico, detalhando o problema encontrado.',
    open: false
  }
]