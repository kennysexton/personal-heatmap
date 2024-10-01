import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function Home() {
    return (
        <div className="h-screen">
            <nav>
                <Link to="/map">View Heatmap</Link>
            </nav>
        </div>
    )
}

export default Home