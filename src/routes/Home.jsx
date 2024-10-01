import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HeatmapButton from '../components/HeatmapButton';


function Home() {
    const navigate = useNavigate();

    function runConversionScript() {
        
    }


    function onViewHeatmapClick() {
        navigate("/map");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
                <HeatmapButton text='Run Script' onClick={runConversionScript} />
                <HeatmapButton text='View Heatmap' onClick={onViewHeatmapClick} />
        </div>
    )
}

export default Home