import React, { useRef } from "react";

import PropTypes from "prop-types";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SwipeableButtonWithDelete = ({
  children,
  onSwipeRight,
  rightSwipeAction,
  enabled = true,
}) => {
  const ref = useRef(null);

  const handleSwipeRight = () => {
    if (typeof onSwipeRight === "function") {
      onSwipeRight();
      ref.current.close();
    }
  };

  if (!enabled) {
    return children;
  }

  return (
    <Swipeable
      ref={ref}
      renderRightActions={rightSwipeAction}
      onSwipeableRightOpen={handleSwipeRight}
      overshootRight={false}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableButtonWithDelete;

SwipeableButtonWithDelete.propTypes = {
  children: PropTypes.any,
  onSwipeRight: PropTypes.func,
  rightSwipeAction: PropTypes.func,
  enabled: PropTypes.bool,
};
