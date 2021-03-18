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

	useEffect(() => {
		if (!localStorage.cart) {
			localStorage.setItem('cart', JSON.stringify([]));
		}
		const initialCart = JSON.parse(localStorage.getItem('cart'));
		console.log(initialCart);
		setCart(initialCart);
	}, []);

	const addItem = (item) => {
		if (cart.includes(item)) {
			window.alert(`${item.title} is already in the cart`);
		} else {
			setCart([...cart, item]);
		}
	};

	const setToLocalStorage = (item) => {
		const cartStorage = [...cart, item];
		localStorage.setItem('cart', JSON.stringify(cartStorage));
	};

	const deleteItemHandler = (id) => {
		const newCart = cart.filter((cartItem) => cartItem.id !== id);
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	return (
		<div className='App'>
			<ProductContext.Provider value={{ products, addItem, setToLocalStorage }}>
				<CartContext.Provider value={{ cart, setCart, deleteItemHandler }}>
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
