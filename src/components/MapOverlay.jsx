import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeatmapButton from '../components/HeatmapButton';
import Dropdown from './Dropdown';

function MapOverlay({ zoom, onOptionChange }) {
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="border-2 border-mb-water rounded bg-[#292929] m-6 flex flex-col">
            <Dropdown onChange={onOptionChange}/>
            <HeatmapButton text='Back to Conversions' onClick={() => navigate("/")} />
            <p>Zoom: {zoom}</p>
        </div>
    )
}

export default MapOverlay;