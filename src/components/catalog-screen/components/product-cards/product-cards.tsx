import { memo } from 'react';
import { EMPTY_GUITARS_LIST_NOTICE, FetchStatus } from '../../../../consts/consts';
import { Guitars } from '../../../../types/guitars';
import EmptyGuitarsListNotice from '../../../common/empty-guitars-list-notice/empty-guitars-list-notice';
import Loading from '../../../common/loading/loading';
import ProductCard from '../product-card/product-card';

type Props = {
  guitars: Guitars;
  fetchStatus: FetchStatus;
};

function ProductCards({ guitars, fetchStatus }: Props): JSX.Element {
  if (fetchStatus === FetchStatus.Fetching) {
    return <Loading />;
  }

  if (!guitars.length) {
    return <EmptyGuitarsListNotice notice={EMPTY_GUITARS_LIST_NOTICE} />;
  }

  return (
    <div className="cards catalog__cards">
      {guitars.map((guitar) => {
        const { id, vendorCode } = guitar;
        return <ProductCard key={`${id}+${vendorCode}`} guitar={guitar} />;
      })}
    </div>
  );
}

export default memo(ProductCards);
