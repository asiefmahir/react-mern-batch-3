import { useRemoveProductMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";

function ProductRow({ item }) {
	const [deleteProduct] = useRemoveProductMutation();

	const removeProductHandler = async (id) => {
		await deleteProduct(id);
		toast.success("Product deleted successfully", {
			position: "top-right",
		});
	};

	return (
		<tr className="product-row d-flex justify-content-around align-items-center">
			<td>
				<img src={item.image} className="product-img" alt="" />
			</td>

			<td>
				<h2>{item.title}</h2>
			</td>
			<td>
				<h2>{item.price}</h2>
			</td>
			<td onClick={() => removeProductHandler(item.id)}>
				<p className="product-icon">x</p>
			</td>
		</tr>
	);
}

export default ProductRow;
