// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import BrandHpeElementPathIcon from 'grommet/components/icons/base/BrandHpeElementPath';

const Logo = ({ size = 'large' }) => {
  return (
    <BrandHpeElementPathIcon size={size} colorIndex="brand" />
  );
};

export default Logo;
