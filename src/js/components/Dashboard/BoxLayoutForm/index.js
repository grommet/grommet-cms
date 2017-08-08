/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import { LayoutForm } from 'grommet-cms/components';

export default function BoxLayoutForm(props: {
  onClose: Function,
  onChange: Function,
  onSubmit: Function,
  isVisible: boolean,
  title: string,
  onToggleHelp: Function,
  fields: Array<{
    label: string,
    name: string,
    type: "Select" | "CheckBox",
    options: ?Array<string>,
    value: ?string
  }>
}) {
  const {
    onClose,
    onChange,
    onSubmit,
    isVisible,
    onToggleHelp,
    ...boxLayoutForm
  } = props;
  return (
    <Layer
      closer
      align="left"
      onClose={onClose}
      hidden={!isVisible}
    >
      <Header pad="medium" align="center">
        <Heading strong align="center">
          Edit Layout
        </Heading>
      </Header>
      <Section pad="medium" align="center">
        <Form pad="medium">
          <FormFields>
            <LayoutForm
              {...boxLayoutForm}
              onToggleHelp={onToggleHelp}
              onChange={onChange}
            />
          </FormFields>
        </Form>
      </Section>
      <Section pad="medium" align="center">
        <Footer align="center" justify="center" pad="medium">
          <Menu
            align="center"
            style={{ width: '100%' }}
            justify="between"
            direction="row"
            inline
            className="responsive-menu"
            responsive
          >
            <Button
              label="submit"
              onClick={() => onSubmit(false)}
              primary
              type="submit"
            />
            <Button
              label="submit and close"
              onClick={() => onSubmit(true)}
              primary
              type="submit"
            />
            <Button
              label="close"
              onClick={onClose}
              primary={false}
            />
          </Menu>
        </Footer>
      </Section>
    </Layer>
  );
}

