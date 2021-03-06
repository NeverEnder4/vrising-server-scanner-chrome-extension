import React from 'react';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';

function Draggable({ children }) {
  const {
    attributes, listeners, setNodeRef, transform,
  } = useDraggable({
    id: 'draggable',
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

Draggable.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Draggable;
