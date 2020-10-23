import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Categories({ items, activeCategory, onClickCategory }) {
	return (
		<div className="categories">
			<ul>
	  		<li
					className={activeCategory === null ? 'active' : ''}
					onClick={() => onClickCategory(null)}>
					Все
				</li>
				{ items &&
					items.map((item, index) => {
						return <li
							className={activeCategory === index ? 'active' : ''}
							onClick={() => onClickCategory(index)}
							key={`${item}_${index}`}>
								{item}
							</li>
					})
				}
			</ul>
		</div>
	)
}

Categories.propTypes = {
	activeCategory: PropTypes.number,
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClickCategory: PropTypes.func,
}

Categories.defaultProps = { items: [], activeCategory: null }

export default Categories;
