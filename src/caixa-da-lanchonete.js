import { Item } from "./item/item.js";
import { cardapio } from "./cardapio/cardapio.js";
import Credito from "./pagamento/credito.js";
import Debito from "./pagamento/debito.js";
import Dinheiro from "./pagamento/dinheiro.js";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.validarItens(itens)) {
      return "Item inválido!";
    }

    if (!this.validarItensExtras(itens)) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (!this.validarQuantidadeDeItens(itens)) {
      return "Quantidade inválida!";
    }

    if (!this.validarQuantidadeDePedidos(itens)) {
      return "Não há itens no carrinho de compra!";
    }

    if (!this.validarFormaDePagamento(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const valorTotal = itens.reduce((acumulador, itemAtual) => {
      const [codigo, quantidade] = itemAtual.split(",");
      const item = new Item(...cardapio[codigo]);

      return acumulador + item.obterValor() * quantidade;
    }, 0);

    const valorFinal = this.realizarPagamento(metodoDePagamento, valorTotal);

    return this.formatarValorFinal(valorFinal);
  }

  validarItens(itens) {
    const codigoItens = itens.map((item) => item.split(",")[0]);

    return !codigoItens.some((item) => !cardapio.hasOwnProperty(item));
  }

  validarItensExtras(itens) {
    const codigoItens = itens.map((item) => item.split(",")[0]);

    return !(
      (codigoItens.includes("chantily") && !codigoItens.includes("cafe")) ||
      (codigoItens.includes("queijo") && !codigoItens.includes("sanduiche"))
    );
  }

  validarQuantidadeDeItens(itens) {
    const quantidadeItens = itens.map((item) => item.split(",")[1]);

    return !quantidadeItens.includes("0");
  }

  validarQuantidadeDePedidos(itens) {
    return itens.length !== 0;
  }

  validarFormaDePagamento(tipo) {
    return ["credito", "debito", "dinheiro"].includes(tipo);
  }

  realizarPagamento(metodo, valor) {
    const metodos = {
      debito: new Debito(valor),
      dinheiro: new Dinheiro(valor),
      credito: new Credito(valor),
    };

    return metodos[metodo].calcularValorFinal();
  }

  formatarValorFinal(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
