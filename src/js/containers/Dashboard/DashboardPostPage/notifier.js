// @flow
import React from 'react';
import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import { ErrorNotification } from 'grommet-cms/components';

export default function DashboardPostPageNotifier(props: {
  toastMessage: ?string,
  error: ?string,
  onCloseToast: Function,
  onClearError: Function
}) {
  const { toastMessage, error, onCloseToast, onClearError } = props;
  if (error) {
    return (
      <Layer isVisible={error} align="center">
        <Box pad={{ vertical: 'medium' }}>
          <ErrorNotification
            errors={[{ message: error }]}
          />
        </Box>
        <Footer pad="medium" justify="end">
          <Button label="close" onClick={() => onClearError()} />
        </Footer>
      </Layer>
    );
  }
  if (toastMessage) {
    return (
      <Toast
        onClose={onCloseToast}
        status="warning"
      >
        {toastMessage}
      </Toast>
    );
  }
  return null;
}
