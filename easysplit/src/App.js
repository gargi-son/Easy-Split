import './App.css';
import Homepage from './views/Homepage';
import linkedin from './linkedin.svg';
import github from './github.svg';
import help_white from "./help_white.svg";
import help_blue from "./help_blue.svg";


function App() {
  return (
    <div className="App">
      <Homepage linkedin={linkedin} github={github} help_white={help_white} help_blue={help_blue}/>
    </div>
  );
}

export default App;
