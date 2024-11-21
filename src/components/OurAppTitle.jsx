import { memo } from "react";

const OurAppTitle = () => {
	console.log("OurAppTitle is rendering");

	return <h2>Our Simple App</h2>;
};

export default memo(OurAppTitle);
