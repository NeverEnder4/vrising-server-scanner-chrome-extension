import React from 'react';

import { useDroppable } from '@dnd-kit/core';
import PropTypes from 'prop-types';

function Droppable({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

Droppable.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Droppable;
