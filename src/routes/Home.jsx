import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HeatmapButton from '../components/HeatmapButton';
import Scripts from '../components/Scripts';
import Dropdown from '../components/Dropdown';
import { DEFAULT_ACTIVITY } from '../constants/activityOptions';


function Home() {
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState(DEFAULT_ACTIVITY);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function onViewHeatmapClick() {
        navigate("/map");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Dropdown value={selectedOption} onChange={handleOptionChange} />
            <Scripts activityType={selectedOption}/>
            <HeatmapButton text='View Heatmap' onClick={onViewHeatmapClick} disabled={true} />
        </div>
    )
}

export default Home