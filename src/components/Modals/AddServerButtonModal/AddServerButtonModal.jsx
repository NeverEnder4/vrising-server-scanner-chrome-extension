import React, { useCallback } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';

import useNavigation from '../../../hooks/useNavigation';
import viewNames from '../../../views/viewNames';
import ZoomFab from '../../Fab';
import { AddServerForm, AddServerFormHeader } from '../../Forms/AddServerForm';
import ButtonModal from '../ButtonModal/ButtonModal';
import FAB_DIAMETER from './constant';

const ICON_DIMENSION = 32;
const MODAL_TITLE = 'Add Server Form';
const MODAL_DESCRIPTION = 'Add a V Rising server using this form';

function AddServerButtonModal() {
  const theme = useTheme();
  const { currentView } = useNavigation();

  const renderIcon = useCallback(() => (
    <AddIcon
      sx={{
        fill: theme.palette.common.white,
        width: ICON_DIMENSION,
        height: ICON_DIMENSION,
      }}
    />
  ));

  const renderOpenButton = useCallback(({ handleOpenModal }) => (
    <ZoomFab
      visible={currentView === viewNames.HOME}
      onClick={handleOpenModal}
      color="primary"
      position="bottomRight"
      size={FAB_DIAMETER}
      ariaLabel="Add Server Button"
      renderIcon={renderIcon}
    />
  ));
  const renderHeader = ({ handleClose }) => (
    <AddServerFormHeader closeModal={handleClose} titleId={MODAL_TITLE} />
  );
  return (
    <ButtonModal
      renderOpenButton={renderOpenButton}
      ariaLabeledBy={MODAL_TITLE}
      ariaDescribedBy={MODAL_DESCRIPTION}
      renderHeader={renderHeader}
    >
      <AddServerForm
        titleId={MODAL_TITLE}
        descriptionId={MODAL_DESCRIPTION}
      />
    </ButtonModal>
  );
}

export default AddServerButtonModal;
