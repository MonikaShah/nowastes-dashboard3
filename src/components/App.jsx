// This is the main component of the application. It will render the entire component tree.

// Custom components
import Header from "./Header";
import Map from "./Map";

// Styles
import "../styles/App.css";

// Utilities
import '@fortawesome/fontawesome-free/css/all.css';


export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="MapContainer">
        <Map />
      </div>
    </div>
  );
}
