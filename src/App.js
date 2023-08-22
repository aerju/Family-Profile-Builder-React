import Header from "./components/Header";
import PersonalDetailsFrom from "./components/PersonalDetailsForm";
import PreviewSection from "./components/PreviewSession";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Header/>
      <PersonalDetailsFrom/>
      <PreviewSection/>
      <ToastContainer />
    </div>
  );
}

export default App;
