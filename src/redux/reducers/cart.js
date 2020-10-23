const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = arr => arr.reduce((summ, obj) => summ + obj.price, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]); 
};

const getTotalSumm = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  if (action.type === 'ADD_PIZZA_TO_CART') {

    const currentPrizzaItems = !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id].items, action.payload];

    const newItems = {
      ...state.items,
        [action.payload.id]: { 
          items: currentPrizzaItems,
          totalPrice: getTotalPrice(currentPrizzaItems),
         },
    };

    const totalCount = getTotalSumm(newItems, 'items.length');
    const totalPrice = getTotalSumm(newItems, 'totalPrice');

    return {
      ...state,
      items: newItems,
      totalCount,
      totalPrice,
    };

  } else if (action.type === 'CLEAR_CART') {

    return { items: {}, totalPrice: 0, totalCount: 0 };

  } else if (action.type === 'REMOVE_CART_ITEM') {

    const newItems = {
      ...state.items
    }
    const currentTotalPrice = newItems[action.payload].totalPrice;
    const currentTotalCount = newItems[action.payload].items.length;
    delete newItems[action.payload];
    return {
      ...state, 
      items: newItems, 
      totalPrice: state.totalPrice - currentTotalPrice,
      totalCount: state.totalCount - currentTotalCount,
    } 

  } else if (action.type === 'PLUS_CART_ITEM') {
    const newObjectItems = [
      ...state.items[action.payload].items,
      state.items[action.payload].items[0]
    ];
    const newItems = {
      ...state.items,
      [action.payload]: { 
        items: newObjectItems,
        totalPrice: getTotalPrice(newObjectItems),
      },
    };
    const totalCount = getTotalSumm(newItems, 'items.length');
    const totalPrice = getTotalSumm(newItems, 'totalPrice');

    return {
      ...state,
      items: {
        ...state.items,
        [action.payload]: { 
          items: newObjectItems,
          totalPrice: getTotalPrice(newObjectItems),
        },
      },
      totalPrice,
      totalCount,
    };

  } else if (action.type === 'MINUS_CART_ITEM') {
    const oldItems = state.items[action.payload].items;
    const newObjectItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
    const newItems = {
      ...state.items,
      [action.payload]: { 
        items: newObjectItems,
        totalPrice: getTotalPrice(newObjectItems),
      },
    };
    const totalCount = getTotalSumm(newItems, 'items.length');
    const totalPrice = getTotalSumm(newItems, 'totalPrice');

    return {
      ...state,
      items: newItems,
      totalPrice,
      totalCount,
    };
  }

  return state;
};

export default cart;