import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { productRequestAsync } from '../../store/product/productSlice';
import { Container } from '../Container/Container';
import { Order } from '../Order/Order';
import style from './Catalog.module.css';


export const Catalog = () => {
	const { products } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { category, activeCategory } = useSelector(state => state.category)
	
	useEffect(() => {
		if (category.length) {
			dispatch(productRequestAsync(category[activeCategory].title));
		}
    }, [category, activeCategory])
	
	return (
		<section className={style.catalog}>
			<Container className={style.container}>
				<Order />

				<div className={style.wrapper}>
					<h2 className={style.title}>{category[activeCategory]?.rus}</h2>



					<div className={style.wrap_list}>
						{products.length ? (
							<ul className={style.list}>
								{products.map(item => (
									<li key={item.id} className={style.item}>
										<CatalogProduct item={item}  />
									</li>
								))}
							</ul>
						) : (
							<h3 className={style.empty}>
								К сожалению товаров данной категории нет
							</h3>
						)}
					</div>
				</div>
			</Container>
		</section>
	)
}