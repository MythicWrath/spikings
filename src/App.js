
import './App.css';
import PhotoResize from './photoResize';
import image from "./images/image.png";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PhotoResize image={image}/>
      </header>

      
    </div>
  );
}

export default App;
