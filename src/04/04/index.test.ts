import { getMyArticleLinksByCategory } from '.';
import * as Fetchers from '../fetchers';
import { getMyArticlesData, httpError } from '../fetchers/fixtures';

jest.mock('../fetchers');

// export function getMyProfile(): Promise<Profile> {
//   return fetch(host("/my/profile")).then(handleResponse);
// }

function mockGetMyArticles(status = 200) {
  if (status > 299) {
    console.log('mockGetMyArticles error', httpError);
    return jest.spyOn(Fetchers, 'getMyArticles').mockRejectedValueOnce(httpError);
  }
  return jest.spyOn(Fetchers, 'getMyArticles').mockResolvedValueOnce(getMyArticlesData);
}

test('指定したタグをもつ記事が一件もない場合、null が返る', async () => {
  mockGetMyArticles();
  // const data = await getMyArticleLinksByCategory("playwright");
  const data = await getMyArticleLinksByCategory('nextjs');
  expect(data).toBeNull();
});

test('指定したタグをもつ記事が一件以上ある場合、リンク一覧が返る', async () => {
  mockGetMyArticles();
  const data = await getMyArticleLinksByCategory('testing');
  expect(data).toMatchObject([
    {
      link: '/articles/howto-testing-with-typescript',
      title: 'TypeScript を使ったテストの書き方',
    },
    {
      link: '/articles/react-component-testing-with-jest',
      title: 'Jest ではじめる React のコンポーネントテスト',
    },
  ]);
});

test('データ取得に失敗した場合、reject される', async () => {
  mockGetMyArticles(500);
  await getMyArticleLinksByCategory('testing').catch((err) => {
    // console.log(err);
    expect(err).toMatchObject({
      err: { message: 'internal server error' },
    });
  });
});
