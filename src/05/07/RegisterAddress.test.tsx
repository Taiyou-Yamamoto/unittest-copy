import { render, screen } from '@testing-library/react';
import { mockPostMyAddress } from './fetchers/mock';
import { RegisterAddress } from './RegisterAddress';
import { clickSubmit, inputContactNumber, inputDeliveryAddress } from './testingUtils';

jest.mock('./fetchers');

// async function fillValuesAndSubmit() {
//   const contactNumber = await inputContactNumber();
//   const deliveryAddress = await inputDeliveryAddress();
//   const submitValues = { ...contactNumber, ...deliveryAddress };
//   await clickSubmit();
//   return submitValues;
// }

beforeEach(() => {
  jest.resetAllMocks();
});

//postMyAddressを使っている？
test('成功時「登録しました」が表示される', async () => {
  const mockFn = mockPostMyAddress();
  render(<RegisterAddress />);
  const contactNumber = await inputContactNumber();
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText('登録しました')).toBeInTheDocument();
});

test('失敗時「登録に失敗しました」が表示される', async () => {
  const mockFn = mockPostMyAddress(500);
  render(<RegisterAddress />);
  //↑ここで以下の関数が呼ばれ
  // **
  // *checkPhoneNumber(values.phoneNumber);
  // *postMyAddress(values);
  // */
  const contactNumber = await inputContactNumber();
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText('登録に失敗しました')).toBeInTheDocument();
});

test('バリデーションエラー時「不正な入力値が含まれています」が表示される', async () => {
  render(<RegisterAddress />);

  await inputDeliveryAddress();
  await clickSubmit();
  expect(screen.getByText('不正な入力値が含まれています')).toBeInTheDocument();
});

test('不明なエラー時「不明なエラーが発生しました」が表示される', async () => {
  render(<RegisterAddress />);
  await inputContactNumber();
  await inputDeliveryAddress();
  await clickSubmit();
  expect(screen.getByText('不明なエラーが発生しました')).toBeInTheDocument();
});

// NOTE: 元々コメントアウトされていた
test('Snapshot: 登録フォームが表示される', async () => {
  mockPostMyAddress();
  // const mockFn = mockPostMyAddress();
  const { container } = render(<RegisterAddress />);
  // const contactNumber = await inputContactNumber();
  // const deliveryAddress = await inputDeliveryAddress();
  // const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  // expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(container).toMatchSnapshot();
});
