import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { ProductContext } from './contexts/productContext';
import { CartContext } from './contexts/cartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = (item) => {
		if (cart.includes(item)) {
			window.alert(`${item.title} is already in the cart`);
		} else {
			setCart([...cart, item]);
		}
	};

	// useEffect(() => {
	// 	console.log(cart);
	// }, [cart]);

	return (
		<div className='App'>
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart }}>
					<Navigation cart={cart} />

					{/* Routes */}
					<Route exact path='/'>
						<Products />
					</Route>

					<Route path='/cart'>
						<ShoppingCart cart={cart} />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
