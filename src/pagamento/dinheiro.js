import Pagamento from "./pagamento.js";

export default class Dinheiro extends Pagamento {
  calcularValorFinal() {
    return this.valor * 0.95;
  }
}
