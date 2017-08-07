/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';

type ConfirmLayerProps = {
  action: ?string,
  note: ?string | ?React$Element<any>,
  onClose: Function,
  onSubmit: Function
};

export default function ConfirmLayer(props: ConfirmLayerProps) {
  const action = props.action || 'delete';
  return (
    <Layer onClose={props.onClose} closer>
      <Form>
        <Header pad="medium" direction="column">
          <Heading margin="none">
            Please confirm
          </Heading>
        </Header>
        <Box pad="medium">
          <Heading tag="h3" align="center">
            Are you sure you want to {action} {props.name || 'this'}?
          </Heading>
          <Box align="center" justify="center">
            {props.note}
          </Box>
        </Box>
        <Footer justify="center" pad="medium">
          <FormFields>
            <Button
              label={action}
              plain={false}
              className="grommetux-button--critical"
              onClick={props.onSubmit}
              style={{ marginRight: 5 }}
            />
            <Button
              label={'cancel'}
              plain={false}
              onClick={props.onClose}
              style={{ marginLeft: 5 }}
            />
          </FormFields>
        </Footer>
      </Form>
    </Layer>
  );
}
