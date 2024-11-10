/**
 * obj = {
 *  name: "Sr Setu",
 *  age: 32,
 *  occupation: "Software Engineer",
 *  skills: ["React", "Redux", "Next", "Node"],
 *  interests: ["Reading", "Chess", "Traveling", "Violine"]
 * }
 *
 */

import "./BioData.css";

const BioData = (props) => {
	const { name, age, skills, mobile, interests } = props;
	// props === props
	console.log(props, "props");

	return (
		<div className="biodata">
			<h1>BioData of {name}</h1>
			<div className="personal-info">
				{mobile && <p>Mobile: {mobile}</p>}
				<p>Age: {age}</p>
				<p>Occupation: Software Engineer</p>
			</div>
			<div className="skills">
				<h2>My Skills:</h2>
				<ul>
					{skills?.map((skill) => (
						<li key={skill}>{skill}</li>
					))}
				</ul>
			</div>
			<div className="interests">
				<h2>My Interests</h2>
				<ul>
					{interests?.map((interest) => (
						<li key={interest}>{interest}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

// const add = (a, b) => {
// 	return a + b;
// };

// add(10, 20); // 30
// add(100, 200); // 300
// add(3, 5); // 8

export default BioData;
