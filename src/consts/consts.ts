enum FetchStatus {
  Fetched = 'Fetched',
  Fetching = 'Fetching',
  Error = 'Error',
}

enum SortType {
  Default = 'default',
  Price = 'price',
  Rating = 'rating',
}

enum SortOrder {
  Default = 'default',
  SortUp = 'asc',
  SortDown = 'desc',
}

const sortBtnsData = {
  type: [
    { type: SortType.Price, description: 'по цене' },
    { type: SortType.Rating, description: 'по популярности' },
  ],
  order: [
    { order: SortOrder.SortUp, description: 'По возрастанию' },
    { order: SortOrder.SortDown, description: 'По убыванию' },
  ],
};

const EMPTY_GUITARS_LIST_NOTICE = 'Sorry, the list of available guitars is empty.';

const STARS_COUNT = 5;

export { FetchStatus, EMPTY_GUITARS_LIST_NOTICE, STARS_COUNT, SortType, SortOrder, sortBtnsData };
