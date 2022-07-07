import React from 'react';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import PropTypes from 'prop-types';

import Droppable from './Droppable';

function SortableVerticalListContext({ children, handleDragEnd, items }) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 0.5 },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <Droppable>{children}</Droppable>
      </SortableContext>
    </DndContext>
  );
}

SortableVerticalListContext.propTypes = {
  children: PropTypes.element.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
};

export default SortableVerticalListContext;
