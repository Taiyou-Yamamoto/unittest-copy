import { greet, sayGoodBye } from './greet';

jest.mock('./greet', () => ({
  sayGoodBye: (name: string) => `seeya, ${name}.`,
}));

test('挨拶が未実装（本来の実装ではない）', () => {
  expect(greet).toBe(undefined);
});

test('さよならを返す（本来の実装ではない）', () => {
  const message = `${sayGoodBye('Taro')} See you.`;
  expect(message).toBe('seeya, Taro. See you.');
});
