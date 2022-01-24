import { Guitar } from '../types/guitar';

const AppRoute = {
  Main: '/',
  Catalog: '/catalog',
  StartPage: '/page_1',
  Page: '/page_',
  Guitars: '/guitars',
  getGuitar: (guitarID: Guitar['id']) => `/catalog/${guitarID}`,
};

enum QueryRoute {
  CommentsEmbed = '_embed=comments',
  Strings = '&stringCount=',
  SortPrice = '_sort=price',
  MinPrice = '&price_gte=',
  MaxPrice = '&price_lte=',
  NameLike = 'name_like=',
  Sort = '&_sort=',
  Type = '&type=',
}

enum NavigateRoute {
  StartPagePathname = 'page_1',
  PagePathname = 'page_',
  StringCount = 'stringCount',
  Type = 'type',
  Sort = 'sort',
  Order = 'order',
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
}

export { AppRoute, QueryRoute, NavigateRoute };
