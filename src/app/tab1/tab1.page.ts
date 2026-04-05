import { Component } from '@angular/core';
import { SenhaService } from '../services/senha.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  ultimaSenha: string = '';

  constructor(private senhaService: SenhaService) {}

  emitirSenha(tipo: string) {
    this.ultimaSenha = this.senhaService.emitirSenha(tipo);
  }
}