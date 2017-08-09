/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Select from 'grommet/components/Select';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import { FilterControl } from 'grommet-cms/components';
import type { GrommetCustomTypes$SelectValueType } from 'grommet';

type Props = {
  onToggle: Function,
  layerVisible: boolean,
  filteredOptions: GrommetCustomTypes$SelectValueType[],
  isFiltering: boolean,
  filter: {
    filteredTotal: number,
    unFilteredTotal: number
  },
  onSubmit: Function,
  onSearchPostTypes: Function,
  onCancel: Function,
  form: {
    postTypes: {
      label: string,
      fieldProps: {
        onChange: Function,
        value: string,
        options: GrommetCustomTypes$SelectValueType[],
        inline: boolean,
        multiple: boolean
      }
    }
  }
}

export default class AssetFilterLayer extends React.Component {
  constructor() {
    super();
    this._addEnterKeyHandler = this._addEnterKeyHandler.bind(this);
    this._removeEnterKeyHandler = this._removeEnterKeyHandler.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
  }

  componentDidMount() {
    this._addEnterKeyHandler();
  }

  componentWillUnmount() {
    this._removeEnterKeyHandler();
  }

  _addEnterKeyHandler: () => void;
  _addEnterKeyHandler() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keyup', this._handleKeyUp);
    }
  }

  _removeEnterKeyHandler: () => void;
  _removeEnterKeyHandler() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keyup', this._handleKeyUp);
    }
  }

  _handleKeyUp: (e: Event) => void;
  _handleKeyUp(e: Event) {
    if (this.props.layerVisible) {
      if (!e.ctrlKey && e.keyCode === 13) {
        this.props.onSubmit();
      } else if (e.ctrlKey && e.keyCode === 13) {
        this.props.onCancel();
      }
    }
  }

  props: Props;

  render() {
    const {
      onToggle,
      onSearchPostTypes,
      layerVisible,
      filter,
      form,
      onSubmit,
      onCancel,
      isFiltering,
      filteredOptions
    } = this.props;
    return (
      <Box>
        <FilterControl
          onClick={onToggle}
          {...filter}
        />
        <Layer
          hidden={!layerVisible}
          onClose={onToggle}
          closer
          align="right"
        >
          <Header size="large" justify="between" align="center">
            <Heading tag="h2">
              Filter Assets
            </Heading>
          </Header>
          <Section pad={{ horizontal: 'large', vertical: 'small' }}>
            <Box>
              {Object.keys(form).map((key) => {
                const { fieldProps, ...formFieldProps } = form[key];
                if (key === 'postTypes') {
                  return (
                    <Box key={key} pad="medium">
                      <FormField {...formFieldProps}>
                        <Box pad="medium">
                          <Select
                            {...fieldProps}
                            autoFocus
                            onSearch={onSearchPostTypes}
                            options={isFiltering ? filteredOptions : fieldProps.options}
                          />
                        </Box>
                      </FormField>
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          </Section>
          <Section pad="large">
            <Footer align="center" justify="center" pad="large">
              <Menu
                align="center"
                style={{ width: '100%' }}
                justify="between"
                direction="row"
                inline
                responsive={false}
              >
                <Button
                  label="submit"
                  style={{ marginRight: 5 }}
                  onClick={onSubmit}
                  primary
                  type="submit"
                />
                <Button
                  className="grommetux-button--critical"
                  style={{ marginLeft: 5 }}
                  label="clear"
                  onClick={onCancel}
                  primary={false}
                />
              </Menu>
            </Footer>
          </Section>
        </Layer>
      </Box>
    );
  }
}
