import FilterByPrice from './components/filter-by-price/filter-by-price';
import FilterByType from './components/filter-by-type/filter-by-type';
import FilterByStrings from './components/filter-by-strings/filter-by-strings';
import { useSelector } from 'react-redux';
import { getPricesFetchStatus } from '../../../../store/catalog/catalog-selectors';
import { FetchStatus } from '../../../../consts/consts';

function CatalogFiltering(): JSX.Element {
  const fetchStatus = useSelector(getPricesFetchStatus);
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      {fetchStatus === FetchStatus.Fetched && <FilterByPrice />}
      <FilterByType />
      <FilterByStrings />
    </form>
  );
}

export default CatalogFiltering;
