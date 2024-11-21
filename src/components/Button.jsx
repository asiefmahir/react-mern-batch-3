import { memo } from "react";

const Button = ({ clickHandler }) => {
	console.log("Button is rendering");

	return <button onClick={clickHandler}>Increase By 1</button>;
};

export default memo(Button);
