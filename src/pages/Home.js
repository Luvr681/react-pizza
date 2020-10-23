import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { setPizzas, fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc'},
  { name: 'цене', type: 'price', order: 'desc'},
  { name: 'алфавиту', type: 'name', order: 'asc'}
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const onSelectCategory = React.useCallback(index => {
    dispatch(setCategory(index));
  }, []);
  
  const onSelectSortType = React.useCallback(type => {
    dispatch(setSortBy(type));
  }, []);
  
  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));  
  }, [category, sortBy]);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_TO_CART',
      payload: obj,
    });
  }

  return (
    <div className="container">
      <div className="content__top">
         <Categories
           activeCategory={category}
           onClickCategory={onSelectCategory}
           items={categoryNames}
         />
       <SortPopup onClickSortType={onSelectSortType} activeSortType={sortBy.type} items={sortItems}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { 
          isLoaded ? items.map(item => <PizzaBlock onClickAddPizza={handleAddPizzaToCart} key={item.id} addedCount={cartItems[item.id] && cartItems[item.id].items.length} {...item}/>) 
          : 
          Array(10).fill(0).map((_, index) => <PizzaLoadingBlock key={index}/>) 
        }
      </div>
    </div>
  )
}

export default Home;
