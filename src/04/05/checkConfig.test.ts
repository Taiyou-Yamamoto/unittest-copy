const config = {
  mock: true,
  feature: { spy: true },
  name: 'test',
};

export function checkConfig(callback?: (payload: object) => void) {
  callback?.(config);
}

test('モック関数は実行時引数のオブジェクト検証ができる', () => {
  const mockFn = jest.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith({
    mock: true,
    feature: { spy: true },
    name: 'test',
  });
});

test('expect.objectContaining による部分検証', () => {
  const mockFn = jest.fn();
  checkConfig(mockFn);
  // const matcher = expect(mockFn);
  // console.log(expect);
  expect(mockFn).toHaveBeenCalledWith(
    expect.objectContaining({
      feature: { spy: true },
    })
  );
});
