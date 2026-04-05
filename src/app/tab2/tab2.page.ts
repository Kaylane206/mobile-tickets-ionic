import { Component } from '@angular/core';
import { SenhaService } from '../services/senha.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  senhaAtual: any = null;
  senhasEmitidas: any[] = [];
  ultimasChamadas: any[] = [];

  constructor(private senhaService: SenhaService) {}

  ionViewWillEnter() {
    this.atualizarPainel();
  }

  atualizarPainel() {
    this.senhasEmitidas = this.senhaService.getSenhasEmitidas();
    this.senhaAtual = this.senhaService.getSenhaAtual();
    this.ultimasChamadas = this.senhaService.getUltimasChamadas();
  }

  chamarProxima() {
    this.senhaService.chamarProximaSenha();
    this.atualizarPainel();
  }

  getFilaEspera() {
    return this.senhasEmitidas.filter(senha => senha.status === 'aguardando');
  }
}