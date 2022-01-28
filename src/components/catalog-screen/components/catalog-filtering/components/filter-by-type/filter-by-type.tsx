import { NavigateRoute } from '../../../../../../consts/app-routes';
import { guitarsData, stringsCount } from '../../../../../../consts/guitar-data';
import { useQuery } from '../../../../../../hooks/use-query';
import { getTypesOverlap } from '../../../../../../utils/utils';
import FilterByTypeItem from './filter-by-type-item';

const strings = Object.values(stringsCount);

function FilterByType(): JSX.Element {
  const query = useQuery();
  const checkedStrings = query.getAll(NavigateRoute.StringCount);
  return (
    <fieldset className="catalog-filter__block">
      {guitarsData.map(({ type, label }) => {
        const isDisabled = !getTypesOverlap(checkedStrings, type, guitarsData, strings);
        return <FilterByTypeItem key={type} type={type} label={label} isDisabled={isDisabled} />;
      })}
    </fieldset>
  );
}

export default FilterByType;
