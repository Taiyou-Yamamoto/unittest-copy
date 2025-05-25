import { render, screen, within } from '@testing-library/react';
import { ArticleList } from './ArticleList';
import { ItemProps } from './ArticleListItem';

export const items: ItemProps[] = [
  {
    id: 'howto-testing-with-typescript',
    title: 'TypeScript を使ったテストの書き方',
    body: 'テストを書く時、TypeScript を使うことで、テストの保守性が向上します…',
  },
  {
    id: 'nextjs-link-component',
    title: 'Next.js の Link コンポーネント',
    body: 'Next.js の画面遷移には、Link コンポーネントを使用します…',
  },
  {
    id: 'react-component-testing-with-jest',
    title: 'Jest ではじめる React のコンポーネントテスト',
    body: 'Jest は単体テストとして、UIコンポーネントのテストが可能です…',
  },
];
test('タイトルの表示', () => {
  render(<ArticleList items={items} />);
  expect(screen.getByRole('heading', { name: '記事一覧' })).toBeInTheDocument();
});

test('items の数だけ一覧表示される', () => {
  render(<ArticleList items={items} />);
  console.log('一覧アイテム', screen.getAllByRole('listitem'));
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

test('items の数だけ一覧表示される', () => {
  render(<ArticleList items={items} />);
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole('listitem')).toHaveLength(3);
});

test('一覧アイテムが空のとき「投稿記事がありません」が表示される', () => {
  render(<ArticleList items={[]} />);
  const list = screen.queryByRole('list');
  expect(list).not.toBeInTheDocument();
  expect(list).toBeNull();
  expect(screen.getByText('投稿記事がありません')).toBeInTheDocument();
});

test('Snapshot: items の数だけ一覧表示される', () => {
  const { container } = render(<ArticleList items={items} />);
  expect(container).toMatchSnapshot();
});
