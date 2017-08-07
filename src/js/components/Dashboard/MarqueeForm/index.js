import React, { Component, PropTypes } from 'react';
import { blockAdd } from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Select from 'grommet/components/Select';
import Section from 'grommet/components/Section';
import RadioButton from 'grommet/components/RadioButton';
import NumberInput from 'grommet/components/NumberInput';
import Footer from 'grommet/components/Footer';
import ImageIcon from 'grommet/components/icons/base/Image';
import Menu from 'grommet/components/Menu';
import DashboardAssetsLayer from 'grommet-cms/containers/Dashboard/DashboardAssetsLayer';
import unescape from 'unescape';

export default class MarqueeForm extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._validatePost = this._validatePost.bind(this);
    this._setHeroImage = this._setHeroImage.bind(this);
    this._onCreateBlockClick = this._onCreateBlockClick.bind(this);
    this._setShouldUpdateHero = this._setShouldUpdateHero.bind(this);
    this._toggleAssetsLayer = this._toggleAssetsLayer.bind(this);
    this._onAssetSelect = this._onAssetSelect.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onChangeColor = this._onChangeColor.bind(this);

    this.state = {
      shouldUpdateHero: false,
      assetsLayer: false,
      tileSize: props.post.tileSize || 'Small Square',
      tileTextColor: props.post.tileTextColor || 'White',
      error: ''
    };
  }

  componentWillReceiveProps({ url, post }) {
    if (url !== this.props.url && this.state.shouldUpdateHero) {
      this.setState({
        shouldUpdateHero: false
      });
      this._setHeroImage(url);
    }
    if (post.tileSize && post.tileSize !== this.state.tileSize) {
      this.setState({
        tileSize: post.tileSize
      });
    }
    if (post.tileTextColor && post.tileTextColor !== this.state.tileTextColor) {
      this.setState({
        tileTextColor: post.tileTextColor
      });
    }
  }

  _toggleAssetsLayer() {
    this.setState({ assetsLayer: !this.state.assetsLayer });
  }

  _setHeroImage(url) {
    this.props.onChange({
      target: {
        id: 'image',
        value: url
      }
    });
  }

  _setShouldUpdateHero() {
    this.setState({
      shouldUpdateHero: true
    });
  }

  _onCreateBlockClick() {
    this.props.dispatch(blockAdd());
  }

  _onChange({ option }: Event) {
    this.props.onChange({
      target: {
        id: 'tileSize',
        value: option
      }
    });
  }

  _onAssetSelect(asset) {
    this.props.onChange({
      target: {
        id: 'image',
        value: asset
      }
    });

    this.setState({ assetsLayer: false });
  }

  _validatePost() {
    const { title, image } = this.props.post;

    if (!title) {
      this.setState({ error: 'A title is required.' });
      return false;
    }

    if (!image) {
      this.setState({ error: 'An Image is required.  If no image is desired, please use the FPO image.' });
      return false;
    }

    this.setState({ error: '' });
    return true;
  }

  _onSubmit() {
    if (this._validatePost()) {
      this.props.onSubmit();
    }
  }

  _onChangeColor() {
    const { tileTextColor } = this.state;
    let newType = 'Black';
    if (tileTextColor === newType) {
      newType = 'White';
    }
    this.props.onChange({
      target: {
        id: 'tileTextColor',
        value: newType
      }
    });
  }

  render() {
    const { onChange, post, onCancel } = this.props;
    const { error, tileSize, tileTextColor } = this.state;
    const { image, title } = post;
    const unescapedTitle = unescape(title || '');
    const assetsLayer = (this.state.assetsLayer)
      ? <DashboardAssetsLayer
        onAssetSelect={this._onAssetSelect}
        onClose={this._toggleAssetsLayer}
      />
      : undefined;
    const errorBox = (error)
      ? <Box>{error}</Box>
      : undefined;

    return (
      <Box>
        {assetsLayer}
        <Section pad="medium" align="center">
          <Form pad="medium">
            <FormFields>
              <fieldset>
                <FormField label="Title" htmlFor="title">
                  <input
                    autoFocus
                    id="title"
                    name="title"
                    type="text"
                    value={unescapedTitle}
                    onChange={onChange}
                  />
                </FormField>
                <FormField label="Sort Order" htmlFor="sortOrder">
                  <NumberInput
                    id="sortOrder"
                    name="sortOrder"
                    min={0}
                    step={1}
                    value={post.sortOrder}
                    onChange={onChange}
                  />
                </FormField>
              </fieldset>
              <fieldset>
                <legend>
                  Tile Image
                </legend>
                <FormField
                  label="Tile Size"
                  htmlFor="tileSize"
                >
                  <Select
                    onChange={this._onChange}
                    id="tileSize"
                    name="tileSize"
                    options={['Small Square', 'Rectangle', 'Large Square']}
                    value={tileSize}
                  />
                </FormField>
                <FormField
                  label="Tile Text Color"
                >
                  <Box direction="row" pad={{ vertical: 'small', horizontal: 'medium' }}>
                    <RadioButton
                      id="black"
                      label="Black"
                      checked={(tileTextColor.toLowerCase() === 'black')}
                      onChange={this._onChangeColor}
                      name="black"
                    />
                    <RadioButton
                      id="white"
                      label="White"
                      checked={(tileTextColor.toLowerCase() === 'white')}
                      onChange={this._onChangeColor}
                      name="white"
                    />
                  </Box>
                </FormField>
                <FormField label="Image Path" htmlFor="image">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={(image && image.path) ? image.path : ''}
                  />
                </FormField>
              </fieldset>
            </FormFields>
          </Form>
          <Footer
            className="dashboard__post-form__button-row"
            align="center"
            pad={{ horizontal: 'medium' }}
          >
            <Box align="start">
              <Button icon={<ImageIcon />} onClick={this._toggleAssetsLayer}>
                Add Asset
              </Button>
            </Box>
          </Footer>
        </Section>
        <Section pad="large">
          {errorBox}
          <Footer
            align="center"
            justify="center"
            pad={{ horizontal: 'small', vertical: 'medium' }}
          >
            <Menu
              align="center"
              pad={{ horizontal: 'medium' }}
              style={{ width: 300 }}
              justify="between"
              direction="row"
              inline
              responsive={false}
            >
              <Button
                label="submit"
                onClick={this._onSubmit}
                primary
                type="submit"
              />
              <Button
                label="cancel"
                onClick={onCancel}
                primary={false}
              />
            </Menu>
          </Footer>
        </Section>
      </Box>
    );
  }
}

MarqueeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  post: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string
};
