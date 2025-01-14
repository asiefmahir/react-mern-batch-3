import Image from "next/image";
const ProductCard = ({ product }) => {
	return (
		<div className="ingredient">
			<div className="ingredient__image">
				<figure>
					{/* <img src={product.image} alt={product.title} /> */}
					<Image
						src={product.image?.secure_url}
						alt=""
						width={1600}
						height={900}
					/>
				</figure>
			</div>
			<div className="ingredient__title">
				<h3>{product.title}</h3>
			</div>
			<div className="ingredient__content">
				<p>
					<span>${product.price}</span>
				</p>
			</div>
			<div className="ingredient__btn">
				<button
					// onClick={(e) => {
					// 	e.stopPropagation();

					// 	dispatch(addToCart(product));
					// }}
					className="btn-white"
				>
					ADD TO CART
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
