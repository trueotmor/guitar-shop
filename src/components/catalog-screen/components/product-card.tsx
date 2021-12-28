import { memo } from 'react';
import { STARS_COUNT } from '../../../consts/consts';
import { Guitar } from '../../../types/guitar';
import uniqid from 'uniqid';

type ProductCardProps = {
  guitar: Guitar;
};

type StarsProps = {
  rating: Guitar['rating'];
};

function Stars(rating: StarsProps) {
  const stars = new Array(STARS_COUNT).fill('');

  return (
    <>
      {stars.map((_star, index) => {
        if (index <= Math.round(rating.rating) - 1) {
          return (
            <svg key={uniqid()} width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
          );
        } else {
          return (
            <svg key={uniqid()} width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
          );
        }
      })}
    </>
  );
}

function ProductCard({ guitar }: ProductCardProps): JSX.Element {
  const { name, price, previewImg, rating } = guitar;
  const formattedPrice = `${price}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ').concat(' ₽');

  return (
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <Stars rating={rating} />
          <span className="rate__count"></span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice}
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="/">
          Подробнее
        </a>
        <a className="button button--red button--mini button--add-to-cart" href="/">
          Купить
        </a>
      </div>
    </div>
  );
}

export default memo(ProductCard);
