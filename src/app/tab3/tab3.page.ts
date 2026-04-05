import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {

  senhas: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    this.carregarSenhas();
  }

  carregarSenhas() {
    const dados = localStorage.getItem('senhasEmitidas');
    this.senhas = dados ? JSON.parse(dados) : [];
  }

  getTotal() {
    return this.senhas.length;
  }

  getTotalSP() {
    return this.senhas.filter(s => s.tipo === 'SP').length;
  }

  getTotalSG() {
    return this.senhas.filter(s => s.tipo === 'SG').length;
  }

  getTotalSE() {
    return this.senhas.filter(s => s.tipo === 'SE').length;
  }

  getUltimaSenha() {
    if (this.senhas.length === 0) {
      return 'Nenhuma senha emitida';
    }
    return this.senhas[this.senhas.length - 1].numero;
  }
}