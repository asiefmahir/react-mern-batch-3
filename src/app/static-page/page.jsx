import mahir from "../../../public/assets/images/mahir.jpg";

import Image from "next/image";

const StaticPage = () => {
	return (
		<div>
			<h2>Static Image</h2>
			<Image src={mahir} alt="" placeholder="blur" />
		</div>
	);
};

export default StaticPage;
