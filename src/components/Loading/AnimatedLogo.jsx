import React from 'react';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DURATION = 2;
const REPEAT = 'Infinity';
const REPEAT_TYPE = 'reverse';
const EASE = 'easeInOut';

function AnimatedLogo({ size }) {
  const borderVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: DURATION,
        repeat: REPEAT,
        repeatType: REPEAT_TYPE,
        ease: EASE,
      },
    },
  };

  const logoVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: 360,
      transition: {
        duration: DURATION,
        repeat: REPEAT,
        repeatType: REPEAT_TYPE,
        ease: EASE,
        repeatDelay: DURATION,
        delay: DURATION,
      },
    },
  };

  return (
    <motion.svg
      width={size}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        initial="hidden"
        animate="visible"
        variants={logoVariants}
        d="M19.4108 13.5L25.4937 32.621H25.7271L31.8223 13.5H37.7208L29.0451 38.667H22.188L13.5 13.5H19.4108Z"
        fill="#D90831"
      />
      <motion.path
        initial="hidden"
        animate="visible"
        variants={borderVariants}
        d="M2 4.5H47.5V47.5H4.5V4.5Z"
        stroke="#D90831"
        strokeWidth="5"
      />
    </motion.svg>
  );
}

AnimatedLogo.defaultProps = {
  size: 48,
};

AnimatedLogo.propTypes = {
  size: PropTypes.number,
};

export default AnimatedLogo;
