import { Item } from './item';

describe('Item', () => {
  test('deve retornar o valor numérico com ponto decimal', () => {
    const descricao = 'Suco Natural';
    const valor = 'R$ 5.80';

    const item = new Item(descricao, valor);

    expect(item.obterValor()).toBe(5.80);
  });
});