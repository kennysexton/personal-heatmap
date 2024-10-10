import { useState } from 'react';
import HeatmapButton from '../components/HeatmapButton';
import Scripts from './Scripts';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

function MapOverlay({ activity, onOptionChange }) {


    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="border-2 border-mb-water rounded bg-[#292929] m-4 flex flex-col">
            <Dropdown onChange={onOptionChange}/>
            <Scripts activityType={activity}/>
        </div>
    )
}

MapOverlay.propTypes = {
    activity: PropTypes.string,
    onOptionChange: PropTypes.func.isRequired,
  };

export default MapOverlay;