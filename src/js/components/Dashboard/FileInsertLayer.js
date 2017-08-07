import React from 'react';

import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import SpinningIcon from 'grommet/components/icons/Spinning';

export default function FileInsertLayer(props) {
  const content = (!props.request)
  ? (
    <Form onSubmit={props.onSubmit}>
      <Header>
        Add File
      </Header>
      <FormFields>
        <fieldset>
          <FormField label="File - 15MB max" htmlFor={"img"}>
            <input id={"img"} name="img" type="file"
              onChange={props.onChange} />
          </FormField>
        </fieldset>
        <p>{props.error}</p>
        <Button onClick={props.onSubmit} primary={true} label="submit" />
      </FormFields>
    </Form>
  ) : (
    <span>
      <SpinningIcon /> loading
    </span>
  );

  return (
    <Layer onClose={props.onLayerClose} closer={true}>
      <Box pad="medium">
        {content}
      </Box>
    </Layer>
  );
}
