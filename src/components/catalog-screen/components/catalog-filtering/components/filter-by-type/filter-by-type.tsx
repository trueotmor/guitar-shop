import { guitarsData } from '../../../../../../consts/guitar-data';
import FilterByTypeItem from './filter-by-type-item';

function FilterByType(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      {guitarsData.map(({ type, label }) => (
        <FilterByTypeItem key={type} type={type} label={label} />
      ))}
    </fieldset>
  );
}

export default FilterByType;
