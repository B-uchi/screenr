import Navbar from "./components/Navbar"
import Homepage from "./pages/HomePage.jsx"

function App() {

  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="h-[92vh] overflow-hidden">
        <Homepage/>
      </div>
    </div>
  )
}

export default App
