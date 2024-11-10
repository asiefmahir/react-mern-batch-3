import "./App.css";
import BioData from "./components/BioData";
function App() {
	console.log("I am running");

	return (
		<div className="App">
			<BioData
				name="Sr Setu"
				age={32}
				mobile="+88123123542354354"
				occupation="Software Developer"
				skills={["React", "Wp", "Php"]}
				interests={["Reading", "Chess", "Traveling", "Violine"]}
			/>
			<BioData
				name="Mahir Asief"
				age={28}
				occupation="Software Developer"
				skills={["React", "Redux"]}
				interests={["Reading", "Chess"]}
			/>
		</div>
	);
}

/**
 * A component must fullfil 3 criteria
 *    1) Component must be a function
 *    2) A Component must return "something"
 *    3) That "something" must be some html-ish code (jsx)
 */

export default App;
