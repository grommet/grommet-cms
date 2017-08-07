import React, { PropTypes } from 'react';

//import Notification from 'grommet/components/Notification';
import Box from 'grommet/components/Box';

export default function DashboardError (props) {
  return (
    <Box style={{width:'100%', background:'#333', color:'#fff'}} justify="center" align="center" pad="medium">
      {props.message}
    </Box>
  );
};

DashboardError.propTypes = {
  message: PropTypes.string
};
