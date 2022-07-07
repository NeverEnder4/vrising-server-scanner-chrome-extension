import React from 'react';

import StorageIcon from '@mui/icons-material/Storage';
import { Box, Grid, useTheme } from '@mui/material';
import capitalize from 'lodash/capitalize';
import moment from 'moment';

import useServers from '../hooks/useServers';
import ConnectionFailedFooter from './ConnectionFailedFooter';
import LabelWithText from './LabelWithText';
import TitleWithIcon from './TitleWithIcon';

function ServerMetaData() {
  const theme = useTheme();
  const { selectedServer } = useServers();

  const renderIcon = (defaultStyles) => (
    <StorageIcon sx={{ ...defaultStyles }} />
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[800],
          paddingTop: theme.spacing(3),
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        }}
      >
        <TitleWithIcon title="Server Metadata" renderIcon={renderIcon} />
        <Grid
          sx={{ padding: theme.spacing(3, 0) }}
          container
          spacing={2}
          height="auto"
        >
          <Grid item xs={8}>
            <LabelWithText label="Name" text={selectedServer?.name} />
          </Grid>
          <Grid item xs={4}>
            <LabelWithText
              label="Password"
              text={capitalize(selectedServer?.password?.toString())}
            />
          </Grid>
          <Grid item xs={8}>
            <LabelWithText label="Map" text={selectedServer?.map} />
          </Grid>
          <Grid item xs={4}>
            <LabelWithText
              label="Days Running"
              text={
              selectedServer?.raw?.rules['days-running']
              || selectedServer?.raw?.rules['days-runningv2']
            }
            />
          </Grid>
          <Grid item xs={8}>
            <LabelWithText label="Connect" text={selectedServer?.connect} />
          </Grid>
          <Grid item xs={4}>
            <LabelWithText label="Ping" text={selectedServer?.ping} />
          </Grid>
          <Grid item xs={8}>
            <LabelWithText
              label="Blood Bound Enabled"
              text={selectedServer?.raw?.rules['blood-bound-enabled']}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelWithText
              label="Max Players"
              text={selectedServer?.maxplayers}
            />
          </Grid>
          <Grid item xs={8}>
            <LabelWithText
              label="Bots Online"
              text={selectedServer?.bots?.length}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelWithText
              label="Players Online"
              text={selectedServer?.players?.length}
            />
          </Grid>
          <Grid item xs={8}>
            <LabelWithText
              label="Last Updated"
              text={moment(selectedServer?.lastUpdated).fromNow()}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelWithText
              label="Connection"
              text={selectedServer?.queryFailed ? 'Failed' : 'Success'}
            />
          </Grid>
          <Grid item xs={12}>
            <LabelWithText
              label="Castle Heart Damage Mode"
              text={selectedServer?.raw?.rules['castle-heart-damage-mode']}
            />
          </Grid>
        </Grid>
      </Box>
      <ConnectionFailedFooter queryFailed={selectedServer?.queryFailed} />
    </>
  );
}

export default ServerMetaData;
