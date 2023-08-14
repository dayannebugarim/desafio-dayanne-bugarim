import Pagamento from "./pagamento.js";

export default class Credito extends Pagamento {
  calcularValorFinal() {
    return this.valor * 1.03;
  }
}
