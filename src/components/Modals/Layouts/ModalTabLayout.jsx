import React, { useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import CloseButton from '../../CloseButton';

const WIDTH = 350;
const HEADER_HEIGHT = 52;

const ModalTabLayout = React.forwardRef(
  ({ headerConfig, handleClose }, ref) => {
    const theme = useTheme();
    const { tabs, keyExtractor } = headerConfig;
    const [tab, setTab] = useState(tabs[0].value);

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    function renderTabs() {
      return tabs.map((tabData) => (
        <Tab
          key={keyExtractor(tabData)}
          label={tabData.label}
          value={tabData.value}
        />
      ));
    }

    function renderPanels() {
      return tabs.map((tabData) => (
        <TabPanel key={keyExtractor(tabData)} value={tabData.value}>
          {tabData.renderPanel()}
        </TabPanel>
      ));
    }

    return (
      <Box
        ref={ref}
        sx={{
          width: WIDTH,
          height: 500,
          position: 'relative',
        }}
      >
        <CloseButton
          sx={{
            position: 'absolute',
            transform: 'translateY(-50%)',
            top: HEADER_HEIGHT / 2,
            right: theme.spacing(2),
            zIndex: theme.zIndex.appBar,
          }}
          handleClose={handleClose}
        />
        <TabContext value={tab}>
          <Box
            sx={{
              backgroundColor: theme.palette.common.black,
              height: HEADER_HEIGHT,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              {renderTabs()}
            </TabList>
          </Box>
          {renderPanels()}
        </TabContext>
      </Box>
    );
  },
);

ModalTabLayout.propTypes = {
  handleClose: PropTypes.func.isRequired,
  headerConfig: PropTypes.shape({
    keyExtractor: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf({
      value: PropTypes.string,
      label: PropTypes.string,
      renderPanel: PropTypes.func,
    }),
  }).isRequired,
};

export default ModalTabLayout;
