
import React, { useEffect, useState } from "react";

export default function ProgressBar(props){
    const [progessBarWidth, setProgressBarWidth] = useState(0);
    const [progressColor, setProgressColor] = useState("");
    useEffect(() => {
        const percentage = 100;
        const totalKeys = Object.keys(props.model).length;
        let filledFieldsCount = 0;
      
        const checkFilledFields = (obj) => {
          Object.values(obj).forEach((value) => {
            if (value != null && value !== undefined && value !== '') {
              filledFieldsCount++;
            } else if (Array.isArray(value)) {
              value.forEach((item) => {
                checkFilledFields(item);
              });
            } else if (value && typeof value === 'object') {
              checkFilledFields(value);
            }
          });
        };
      
        checkFilledFields(props.model);
      
        const progress = (filledFieldsCount / totalKeys) * 100;
      
        const progressColor =
          progress <= 50
            ? 'bar progress-bar progress-bar-striped progress-bar-animated bg-danger'
            : progress > 50 && progress < 75
            ? 'bar progress-bar progress-bar-striped progress-bar-animated bg-warning'
            : 'bar progress-bar progress-bar-striped progress-bar-animated bg-success';
      
        setProgressBarWidth(`${progress}%`);
        setProgressColor(progressColor);
      }, [props.model]);
    return(
        <div id="bar" className="progress mb-3" style={{ height: 7 }}>
        <div
          className={progressColor}
          style={{ width: progessBarWidth }}
        />
      </div>
    )
}