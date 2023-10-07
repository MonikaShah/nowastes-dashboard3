// This is the main component of the application. It will render the entire component tree.

// zustand imports
import { useStore } from "../store/store.js";

// Custom components
import Header from "./Header";
import Map from "./Map";

import Loader from "./Loader";

// Styles
import "../styles/App.css";

// Utilities
import "@fortawesome/fontawesome-free/css/all.css";

export default function App() {
  // loading state
  const isLoading = useStore((state) => state.isLoading);

  return (
    <div className="App">
      {/* display loading spinner if data is loading */}
      {isLoading && <Loader />}
      <Header />
      <div className="MapContainer">
        <Map />
      </div>
    </div>
  );
}
