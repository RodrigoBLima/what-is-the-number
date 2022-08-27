import React, { memo } from "react";

interface SevenSegmentProps {
  color: string;
  displayNumber: string;
}

/**
* Seven segments component display, receive a string with a number and tranform in a array, 
* so show on the display the string in format of numbers
*/
function SevenSegment(props: SevenSegmentProps) {
  const { color, displayNumber = "0" } = props;

  const stringArr = React.useMemo(() => [...displayNumber], [displayNumber]);

  return (
    <div id="seven-segment-container">
      {(stringArr || []).map((str, index) => (
        <div
          id={`display-${index}}`}
          className={`display-container display-size-12 display-no-${str}`}
          key={index}
        >
          <div className={`segment-x ${color} segment-a`}>
            <span className={`segment-border ${color}`}></span>
          </div>
          <div className={`segment-y ${color} segment-b`}>
            <span className={`segment-border ${color}`}></span>
          </div>
          <div className={`segment-y ${color} segment-c`}>
            <span className={`segment-border ${color}`}></span>
          </div>
          <div className={`segment-x ${color} segment-d`}>
            <span className={`segment-border ${color}`}></span>
          </div>
          <div className={`segment-y ${color} segment-e`}>
            <span className={`segment-border ${color}`}></span>
          </div>
          <div className={`segment-y ${color} segment-f`}>
            <span className={`segment-border ${color}`}></span>
          </div>
          <div className={`segment-x ${color} segment-g`}>
            <span className={`segment-border ${color}`}></span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(SevenSegment);
