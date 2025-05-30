import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
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

export default {
  component: ArticleList,
} as ComponentMeta<typeof ArticleList>;

type Story = ComponentStoryObj<typeof ArticleList>;

export const Default: Story = {
  args: { items },
};

export const NoItem: Story = {
  args: { items: [] },
};
