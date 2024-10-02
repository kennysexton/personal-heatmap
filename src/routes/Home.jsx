import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HeatmapButton from '../components/HeatmapButton';
import ScriptExecutor from '../components/ScriptExecutor';


function Home() {
    const navigate = useNavigate();

    // function runConversionScript() {
    //     <ScriptExecutor/>
    // }


    function onViewHeatmapClick() {
        navigate("/map");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
                <ScriptExecutor/>
                <HeatmapButton text='View Heatmap' onClick={onViewHeatmapClick} />
        </div>
    )
}

export default Home