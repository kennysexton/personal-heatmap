import { useState } from 'react';
import HeatmapButton from '../components/HeatmapButton';
import Scripts from './Scripts';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

function MapOverlay({ activity, onOptionChange }) {


    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className='flex flex-row text-lg text-white'>
            <div className="flex items-center">
                <HeatmapButton className="m-0" text="Layers" vertical={true} onClick={() => setIsExpanded(!isExpanded)} />
            </div>
            <div className={`border-2 border-gray-200 rounded bg-[#292929] flex flex-col ${isExpanded ? 'w-auto' : 'w-0'}`}>
                <Dropdown onChange={onOptionChange} />
                <Scripts activityType={activity} />
            </div>
        </div>
    )
}

MapOverlay.propTypes = {
    activity: PropTypes.string,
    onOptionChange: PropTypes.func.isRequired,
};

export default MapOverlay;