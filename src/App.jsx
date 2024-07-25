import './App.css'
import Navbar from '@/components/Navbar/Navbar'
import About from '@/components/Sections/About/About'
import Projects from '@/components/Sections/Projects/Projects'
import Resume from '@/components/Sections/Resume/Resume'
import Contact from '@/components/Sections/Contact/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div id="inner-body">
        <About />
        <Projects />
        <Resume />
        <Contact />
      </div>
    </div>
  )
}

export default App
