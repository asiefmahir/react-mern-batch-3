import { memo } from "react";
const Title = ({ value }) => {
	console.log("Title rendering");

	return <p>The value of the counter is {value}</p>;
};

export default memo(Title);
