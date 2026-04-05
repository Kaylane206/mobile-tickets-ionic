import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  contadorSP: number = 1;
  contadorSG: number = 1;
  contadorSE: number = 1;

  senhasEmitidas: any[] = [];
  senhaAtual: any = null;
  ultimasChamadas: any[] = [];

  ordemPrioridade: string[] = ['SP', 'SE', 'SG'];
  indicePrioridade: number = 0;

  constructor() {
  const dados = localStorage.getItem('senhas');
  if (dados) {
    this.senhasEmitidas = JSON.parse(dados);
  }

  const atual = localStorage.getItem('senhaAtual');
  if (atual) {
    this.senhaAtual = JSON.parse(atual);
  }

  const chamadas = localStorage.getItem('ultimasChamadas');
  if (chamadas) {
    this.ultimasChamadas = JSON.parse(chamadas);
  }
}

  carregarDados() {
    const dados = localStorage.getItem('senhasEmitidas');
    const contSP = localStorage.getItem('contadorSP');
    const contSG = localStorage.getItem('contadorSG');
    const contSE = localStorage.getItem('contadorSE');
    const indice = localStorage.getItem('indicePrioridade');

    if (dados) {
      this.senhasEmitidas = JSON.parse(dados);
    }

    if (contSP) {
      this.contadorSP = parseInt(contSP, 10);
    }

    if (contSG) {
      this.contadorSG = parseInt(contSG, 10);
    }

    if (contSE) {
      this.contadorSE = parseInt(contSE, 10);
    }

    if (indice) {
      this.indicePrioridade = parseInt(indice, 10);
    }
  }

  salvarDados() {
    localStorage.setItem('senhasEmitidas', JSON.stringify(this.senhasEmitidas));
    localStorage.setItem('contadorSP', this.contadorSP.toString());
    localStorage.setItem('contadorSG', this.contadorSG.toString());
    localStorage.setItem('contadorSE', this.contadorSE.toString());
    localStorage.setItem('indicePrioridade', this.indicePrioridade.toString());
    localStorage.setItem('senhas', JSON.stringify(this.senhasEmitidas));
  localStorage.setItem('senhaAtual', JSON.stringify(this.senhaAtual));
  localStorage.setItem('ultimasChamadas', JSON.stringify(this.ultimasChamadas));
  }

  emitirSenha(tipo: string): string {
    const hoje = new Date();

    const ano = hoje.getFullYear().toString().slice(-2);
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    let sequencia = '';

    if (tipo === 'SP') {
      sequencia = String(this.contadorSP).padStart(3, '0');
      this.contadorSP++;
    } else if (tipo === 'SG') {
      sequencia = String(this.contadorSG).padStart(3, '0');
      this.contadorSG++;
    } else if (tipo === 'SE') {
      sequencia = String(this.contadorSE).padStart(3, '0');
      this.contadorSE++;
    }

    const novaSenha = `${ano}${mes}${dia}-${tipo}-${sequencia}`;

    this.senhasEmitidas.push({
  numero: novaSenha,
  tipo: tipo,
  dataHora: new Date(),
  status: 'aguardando'
});

this.salvarDados();

return novaSenha;
  }

  getSenhasEmitidas() {
    return this.senhasEmitidas;
    
  }

  chamarProximaSenha() {
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    const tipoAtual = this.ordemPrioridade[this.indicePrioridade];

    const senhaEncontrada = this.senhasEmitidas.find(
      senha => senha.status === 'aguardando' && senha.tipo === tipoAtual
    );

    this.indicePrioridade = (this.indicePrioridade + 1) % 3;

    if (senhaEncontrada) {
      senhaEncontrada.status = 'chamada';
      this.senhaAtual = senhaEncontrada;

      this.ultimasChamadas.unshift(senhaEncontrada);

      if (this.ultimasChamadas.length > 5) {
        this.ultimasChamadas.pop();
      }

      this.salvarDados();
      return senhaEncontrada;
    }
  }

  return null;
}

  getTotalEmitidas() {
    return this.senhasEmitidas.length;
  }

  getTotalPorTipo(tipo: string) {
    return this.senhasEmitidas.filter(senha => senha.tipo === tipo).length;
  }

  getUltimaSenhaEmitida() {
    if (this.senhasEmitidas.length === 0) {
      return null;
    }
    return this.senhasEmitidas[this.senhasEmitidas.length - 1];
  }

  getSenhaAtual() {
  return this.senhaAtual;
}

getUltimasChamadas() {
  return this.ultimasChamadas;
}
}