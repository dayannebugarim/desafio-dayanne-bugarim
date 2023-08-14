class Item {
  constructor(descricao, valor) {
    this.descricao = descricao;
    this.valor = valor;
  }

  obterValor() {
    const valorNumerico = this.valor.split("R$ ")[1];
    return parseFloat(valorNumerico.replace(",", "."));
  }
}

export { Item };
