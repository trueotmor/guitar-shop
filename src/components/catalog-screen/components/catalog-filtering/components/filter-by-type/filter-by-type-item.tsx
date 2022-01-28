import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { changeCatalogPage } from '../../../../../../store/catalog/catalog-data';
import { useQuery } from '../../../../../../hooks/use-query';
import { FIRST_PAGE } from '../../../../../../consts/consts';
import { NavigateRoute } from '../../../../../../consts/app-routes';

type FilterTypeItemProps = {
  type: string;
  label: string;
  isDisabled: boolean;
};

function FilterByTypeItem({ type, label, isDisabled }: FilterTypeItemProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const checkedItems = query.getAll(NavigateRoute.Type);
  const { pathname } = useLocation();

  const [isChecked, setIsChecked] = useState<boolean>(checkedItems.includes(type));

  useEffect(() => {
    setIsChecked(checkedItems.includes(type));
  }, [query, checkedItems, history, pathname, type]);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setIsChecked(checked);
    query.delete(NavigateRoute.Type);

    if (checked) {
      checkedItems.push(type);
      checkedItems.forEach((item) => query.append(NavigateRoute.Type, item));
    } else {
      const checkedTypes = checkedItems.filter((item) => type !== item);
      checkedTypes.forEach((item) => query.append(NavigateRoute.Type, item));
    }
    dispatch(changeCatalogPage(FIRST_PAGE));
    history.push({ pathname: NavigateRoute.StartPagePathname, search: query.toString() });
  };

  return (
    <div className="form-checkbox catalog-filter__block-item" key={type}>
      <input
        className="visually-hidden"
        type="checkbox"
        id={type}
        name={type}
        checked={isChecked}
        onChange={onInputChange}
        disabled={isDisabled}
      />
      <label htmlFor={type}>{label}</label>
    </div>
  );
}

export default memo(FilterByTypeItem);
