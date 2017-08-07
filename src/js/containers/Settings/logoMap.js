import React from 'react';
import PlatformArubaIcon from 'grommet/components/icons/base/PlatformAruba';
import BrandHpeElementOutlineIcon from 'grommet/components/icons/base/BrandHpeElementOutline';
import PlatformHpiIcon from 'grommet/components/icons/base/PlatformHpi';
import BrandGrommetOutlineIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import Image from 'grommet/components/Image';

export default {
  'HPE': <BrandHpeElementOutlineIcon size="small" />,
  'HPI': <PlatformHpiIcon size="small" />,
  'ARUBA': <PlatformArubaIcon size="small" />,
  'GROMMET': <BrandGrommetOutlineIcon size="small" />,
  logo: (logo) => <Image size="large" alt="logo" src={logo.path} />
};
