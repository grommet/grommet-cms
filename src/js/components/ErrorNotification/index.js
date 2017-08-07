/* @flow */
import React from 'react';
import Notification from 'grommet/components/Notification';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';

export default function ErrorNotification(props: {
  onClose?: Function,
  errors: Array<{ message: string }> 
}) {
  return (
    <Section pad="medium">
      {props.errors.length > 0 && props.errors.map((error, i) =>
        <Box key={i} className="error-notification">
          {typeof props.onClose === 'function' &&
            <Button
              plain
              onClick={() => props.onClose && props.onClose(i)}
              className="error-notification__closer-button"
              a11yTitle="Close Alert"
            >
              <CloseIcon a11yTitle="Close Alert" />
            </Button>
          }
          <Notification
            role="alert"
            style={{ paddingTop: 10 }}
            status="critical"
            a11yTitle="Submission Failed"
            size="small"
            message={error.message}
          />
        </Box>
      )}
    </Section>
  );
}
