import { memo } from 'react';
import { NavigateRoute } from '../../../../../../consts/app-routes';
import { guitarsData, stringsCount } from '../../../../../../consts/guitar-data';
import { useQuery } from '../../../../../../hooks/use-query';
import FilterByStringsItem from './filter-by-strings-item';
import { getStringsOverlap } from '../../../../../../utils/utils';

const strings = Object.values(stringsCount);

function FilterByStrings(): JSX.Element {
  const query = useQuery();
  const checkedTypes = query.getAll(NavigateRoute.Type);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {strings.map((stringCount) => {
        const isDisabled = !getStringsOverlap(checkedTypes, stringCount, guitarsData);
        return <FilterByStringsItem key={stringCount} stringsCount={stringCount} isDisabled={isDisabled} />;
      })}
    </fieldset>
  );
}

export default memo(FilterByStrings);
