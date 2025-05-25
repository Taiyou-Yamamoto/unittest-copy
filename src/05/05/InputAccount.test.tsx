import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputAccount } from './InputAccount';

const user = userEvent.setup();

test('fieldset のアクセシブルネームは、legend を引用している', () => {
  render(<InputAccount />);
  expect(screen.getByRole('group', { name: 'アカウント情報の入力' })).toBeInTheDocument();
});

test('メールアドレス入力欄', async () => {
  render(<InputAccount />);
  const textbox = screen.getByRole('textbox', { name: 'メールアドレス' });
  const value = 'taro.tanaka@example.com';
  console.log('user', user);
  await user.type(textbox, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test('パスワード入力欄', async () => {
  render(<InputAccount />);
  //toThrowはエラーを投げることを期待する
  expect(() => screen.getByPlaceholderText('8文字以上で入力')).not.toThrow();
  expect(() => screen.getByRole('textbox', { name: 'パスワード' })).toThrow();
});

test('パスワード入力欄', async () => {
  render(<InputAccount />);
  const password = screen.getByPlaceholderText('8文字以上で入力');
  const value = 'abcd1234';
  await user.type(password, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test('Snapshot: アカウント情報の入力フォームが表示される', () => {
  const { container } = render(<InputAccount />);
  expect(container).toMatchSnapshot();
});
