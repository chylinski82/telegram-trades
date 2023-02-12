import React, { useState } from 'react';

export const SelectPeriodPresentation = ({
  isCustom,
  startDate,
  endDate,
  stylesCustomPeriod,
  handlePeriodChange,
  handleStartDateChange,
  handleEndDateChange,
  handlePeriodSubmit
}) => {
    
    return (       
        <div>
            <select onChange={handlePeriodChange} className='header-field'>
                <option value="1m">Period: 1m</option>
                <option value="3m">Period: 3m</option>
                <option value="6m" selected>Period: 6m</option>
                <option value="12m">Period: 12m</option>
                <option value="18m">Period: 18m</option>
                <option value="24m">Period: 24m</option>
                <option value="all">Period: All</option>
                <option value="custom">Period: Custom</option>
            </select>
            {isCustom && (
                <div id='custom-period'>
                    <label>
                    Start date:
                    <input
                        className="input-field"
                        type="datetime-local"
                        name="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    </label>
                    <label>
                    End date:
                    <input 
                        className="input-field"
                        type="datetime-local"
                        name="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    </label>
                    <button type="submit" onClick={handlePeriodSubmit}>Apply</button>
                </div>
            )}
        </div>
    );
}

