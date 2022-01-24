import { stringsCount } from '../../../../../../consts/guitar-data';
import FilterByStringsItem from './filter-by-strings-item';

const strings = Object.values(stringsCount);

function FilterByStrings(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {strings.map((stringCount) => (
        <FilterByStringsItem key={stringCount} stringsCount={stringCount} />
      ))}
    </fieldset>
  );
}

export default FilterByStrings;
