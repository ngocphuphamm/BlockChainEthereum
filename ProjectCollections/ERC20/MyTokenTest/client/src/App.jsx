import { EthProvider } from "./contexts/EthContext";
import Main from "./components/Intro/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <EthProvider>
      <div className = "col-sm-12 d-flex justify-content-center" >
          <div className = "col-sm-5">
                    <Main/>
          </div>
         
      </div>
    </EthProvider>
  );
}

export default App;
