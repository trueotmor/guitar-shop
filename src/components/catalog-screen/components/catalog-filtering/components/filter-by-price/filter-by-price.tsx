import { memo, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterPrice } from '../../../../../../store/catalog/catalog-data';
import { changeCatalogPage } from '../../../../../../store/catalog/catalog-data';
import { useLocation, useHistory } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { useQuery } from '../../../../../../hooks/use-query';
import { NavigateRoute } from '../../../../../../consts/app-routes';
import { FIRST_PAGE } from '../../../../../../consts/consts';
import { getGuitarsPrices, getPricesFetchStatus } from '../../../../../../store/catalog/catalog-selectors';
import { FetchStatus } from '../../../../../../consts/consts';
import { validate } from '../../../../../../utils/utils';
import { ZeroDash } from '../../../../../../consts/reg-exp';

function FilterByPrice(): JSX.Element {
  const dispatch = useDispatch();
  const searchParams = useQuery();
  const history = useHistory();
  const location = useLocation();
  const fetchStatus = useSelector(getPricesFetchStatus);

  const guitarsPrices = useSelector(getGuitarsPrices);
  const minPrice = guitarsPrices[0].price;
  const maxPrice = guitarsPrices[guitarsPrices.length - 1].price;

  const isLoading = fetchStatus === FetchStatus.Fetching;

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const minParams = searchParams.get(NavigateRoute.MinPrice) || '';
  const maxParams = searchParams.get(NavigateRoute.MaxPrice) || '';

  const [currentMin, setCurrentMin] = useState(minParams);
  const [currentMax, setCurrentMax] = useState(maxParams);

  const debounceMinPrice = useDebounce(currentMin, 500);
  const debounceMaxPrice = useDebounce(currentMax, 500);

  const onMinPriceChange = (): void => {
    if (minPriceRef.current) {
      const minInput = minPriceRef.current.value.replace(ZeroDash, '');

      if (minInput) {
        minPriceRef.current.setCustomValidity(validate(minInput));
        minPriceRef.current.reportValidity();
        setCurrentMin(minInput);
        searchParams.set(NavigateRoute.MinPrice, minInput);
        dispatch(changeCatalogPage(FIRST_PAGE));
        history.push({ pathname: NavigateRoute.StartPagePathname, search: searchParams.toString() });
        return;
      }
      setCurrentMin('');
      searchParams.delete(NavigateRoute.MinPrice);
      history.replace({ pathname: NavigateRoute.StartPagePathname, search: searchParams.toString() });
    }
  };

  const onMinPriceLeave = (): void => {
    if (currentMin !== '') {
      const minInputNumber = +currentMin;
      const maxInputNumber = +currentMax;
      let minLeave = currentMin;
      if (minInputNumber < minPrice) {
        minLeave = minPrice.toString();
      }
      if (minInputNumber > maxPrice) {
        minLeave = maxPrice.toString();
      }
      if (minInputNumber > maxInputNumber && currentMax !== '') {
        minLeave = maxInputNumber.toString();
      }
      setCurrentMin(minLeave);
      searchParams.set(NavigateRoute.MinPrice, minLeave);
      history.push({ pathname: NavigateRoute.StartPagePathname, search: searchParams.toString() });
      return;
    }
    searchParams.delete(NavigateRoute.MinPrice);
    history.replace({ pathname: location.pathname, search: searchParams.toString() });
  };

  const onMaxPriceChange = (): void => {
    if (maxPriceRef.current) {
      const maxInput = maxPriceRef.current.value.replace(ZeroDash, '');

      if (maxInput) {
        maxPriceRef.current.setCustomValidity(validate(maxInput));
        maxPriceRef.current.reportValidity();
        setCurrentMax(maxInput);
        dispatch(changeCatalogPage(FIRST_PAGE));
        searchParams.set(NavigateRoute.MaxPrice, maxInput);
        history.push({ pathname: NavigateRoute.StartPagePathname, search: searchParams.toString() });
        return;
      }
      setCurrentMax('');
      searchParams.delete(NavigateRoute.MaxPrice);
      history.push({ pathname: NavigateRoute.StartPagePathname, search: searchParams.toString() });
    }
  };

  const onMaxPriceLeave = (): void => {
    if (currentMax !== '') {
      const minInputNumber = +currentMin;
      const maxInputNumber = +currentMax;
      let maxLeave = currentMax;
      if (maxInputNumber > maxPrice) {
        maxLeave = maxPrice.toString();
      }
      if (maxInputNumber < minPrice) {
        maxLeave = minPrice.toString();
      }
      if (maxInputNumber < minInputNumber && currentMin !== '') {
        maxLeave = minInputNumber.toString();
      }
      setCurrentMax(maxLeave);
      searchParams.set(NavigateRoute.MaxPrice, maxLeave);
      history.push({ pathname: NavigateRoute.StartPagePathname, search: searchParams.toString() });
      return;
    }
    searchParams.delete(NavigateRoute.MaxPrice);
    history.push({ pathname: location.pathname, search: searchParams.toString() });
  };

  useEffect(() => {
    dispatch(changeFilterPrice({ minPrice: debounceMinPrice, maxPrice: debounceMaxPrice }));
  }, [dispatch, debounceMinPrice, debounceMaxPrice]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={!isLoading ? minPrice.toLocaleString() : ''}
            id="priceMin"
            name="от"
            onChange={onMinPriceChange}
            onBlur={onMinPriceLeave}
            ref={minPriceRef}
            value={currentMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={!isLoading ? maxPrice.toLocaleString() : ''}
            id="priceMax"
            name="до"
            onChange={onMaxPriceChange}
            onBlur={onMaxPriceLeave}
            ref={maxPriceRef}
            value={currentMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default memo(FilterByPrice);
