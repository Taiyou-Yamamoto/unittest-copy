// import { greet } from './greet';

test('モック関数は実行された', () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toBeCalled();
});

test('モック関数は実行されていない', () => {
  const mockFn = jest.fn();
  expect(mockFn).not.toBeCalled();
});

test('モック関数は実行された回数を記録している', () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});

test('モック関数は関数の中でも実行できる', () => {
  const mockFn = jest.fn();
  function greet() {
    mockFn();
  }
  greet();
  for (let i = 0; i < 3; i++) {
    greet();
  }
  expect(mockFn).toHaveBeenCalledTimes(4);
  // expect(mockFn).toHaveBeenCalledTimes(1);
});

test('モック関数は実行時の引数を記録している', () => {
  const mockFn = jest.fn();
  function greet(message: string) {
    mockFn(message);
    console.log('this is mock', mockFn(message));
  }
  greet('hello');
  expect(mockFn).toHaveBeenCalledWith('hello');
});

export function greet(name: string, callback?: (message: string) => void) {
  callback?.(`Hello! ${name}`);
}

test('モック関数はテスト対象の引数として使用できる', () => {
  const mockFn = jest.fn();
  // console.log(greet('Jiro', mockFn));
  greet('Jiro', mockFn);
  // console.log(mockFn('こんにちは'));
  expect(mockFn).toHaveBeenCalledWith('Hello! Jiro');
});
