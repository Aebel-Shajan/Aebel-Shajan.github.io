import './App.css'
import Navbar from './components/Navbar/Navbar'
import About from './components/Sections/About/About'
import Projects from './components/Sections/Projects/Projects'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div id="inner-body">
        <About />
        <Projects />
      </div>
    </div>
  )
}

export default App
