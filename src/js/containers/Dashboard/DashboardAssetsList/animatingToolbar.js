// @flow
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { AssetsToolbar } from 'grommet-cms/components';

type Props = {
  isVisible: boolean,
  onClick: () => void,
  buttonType: 'SUBMIT' | 'DELETE'
}

export default function AnimatingToolbar({
  isVisible,
  ...toolbarProps
}: Props) {
  return (
    <ReactCSSTransitionGroup
      transitionName="slide-up"
      transitionLeave
      transitionEnter
      transitionLeaveTimeout={1500}
      transitionEnterTimeout={1500}
    >
      {isVisible &&
        <AssetsToolbar {...toolbarProps} />
      }
    </ReactCSSTransitionGroup>
  );
}
