import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { changeCatalogPage } from '../../../../../../store/catalog/catalog-data';
import { useQuery } from '../../../../../../hooks/use-query';
import { FIRST_PAGE } from '../../../../../../consts/consts';
import { NavigateRoute } from '../../../../../../consts/app-routes';

type FilterStringsItemProps = {
  stringsCount: string;
  isDisabled: boolean;
};

function FilterByStringsItem({ stringsCount, isDisabled }: FilterStringsItemProps): JSX.Element {
  const stringName = `${stringsCount}-strings`;
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const checkedItems = query.getAll(NavigateRoute.StringCount);
  const { pathname } = useLocation();

  const [isChecked, setIsChecked] = useState<boolean>(checkedItems.includes(stringsCount));

  useEffect(() => {
    setIsChecked(checkedItems.includes(stringsCount));
  }, [query, checkedItems, history, pathname, stringsCount]);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setIsChecked(checked);
    query.delete(NavigateRoute.StringCount);

    if (checked) {
      checkedItems.push(stringsCount);
      checkedItems.forEach((item) => query.append(NavigateRoute.StringCount, item));
    } else {
      const checkedStrings = checkedItems.filter((item) => stringsCount !== item);
      checkedStrings.forEach((item) => query.append(NavigateRoute.StringCount, item));
    }
    dispatch(changeCatalogPage(FIRST_PAGE));
    history.push({ pathname: NavigateRoute.StartPagePathname, search: query.toString() });
  };

  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={stringName}
        name={stringName}
        data-strings={stringsCount}
        checked={isChecked}
        onChange={onInputChange}
        disabled={isDisabled}
      />
      <label htmlFor={stringName}>{stringsCount}</label>
    </div>
  );
}

export default memo(FilterByStringsItem);
