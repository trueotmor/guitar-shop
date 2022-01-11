import classNames from 'classnames';
import { ChangeEvent, memo, useState, MouseEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../consts/app-routes';
import { Guitars } from '../../../types/guitars';
import styles from '../components/form-search.module.scss';
import { useDebounce } from 'usehooks-ts';
import { fetchGuitars } from '../../../services/fetch-guitars';

function FormSearch() {
  const [givenValue, setGivenValue] = useState('');
  const [result, setResult] = useState<Guitars>([]);
  const nameLike = useDebounce(givenValue, 500);

  useEffect(() => {
    fetchGuitars({ nameLike }).then((response) => {
      setResult(response);
    });
  }, [nameLike]);

  const navigate = useNavigate();

  const handleInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setGivenValue(evt.currentTarget.value);
  };

  const handleItemClick = (evt: MouseEvent<HTMLLIElement>) => {
    navigate(AppRoute.getGuitar(evt.currentTarget.id));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const input = evt.currentTarget.querySelector('input');
    input && setGivenValue(input.value);
  };

  return (
    <div className="form-search">
      <form className="form-search__form" onSubmit={handleFormSubmit}>
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={handleInputValue}
          value={givenValue}
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      <ul
        className={classNames('form-search__select-list', `${styles['form-search__select-list']}`, {
          'hidden': !result || !givenValue,
        })}
      >
        {result.map(({ id, name }) => (
          <li
            className="form-search__select-item"
            tabIndex={0}
            id={`${id}`}
            key={id}
            onClick={handleItemClick}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(FormSearch);
