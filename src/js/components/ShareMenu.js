import React, { Component, PropTypes } from 'react';
import Layer from 'grommet/components/Layer';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import SocialShare from 'grommet/components/SocialShare';

export default class ShareMenu extends Component {

  constructor() {
    super();
    this._onClickShareLink = this._onClickShareLink.bind(this);
  }

  _onClickShareLink () {
    let linkInput = document.querySelector('.share-link');
    linkInput.select();
  }

  render() {
    const { title, rnum } = this.props;
    const shareLink = window.location.href;

    return (
      <Layer className="labs__publication" align="right"
        closer={true} onClose={this.props.onClose}
        a11yTitle="Share Publication">
        <Box pad="large">
          <Sidebar size="large" full={false}>
            <Label margin="small">Share Publication</Label>
            <h1><strong>{title || rnum}</strong></h1>
            <Form pad={{vertical: 'small'}}>
              <FormField size="large" strong={true} label="Publication Link">
                <input className="share-link" type="text" value={shareLink}
                  onClick={this._onClickShareLink} readOnly />
              </FormField>
            </Form>
            <Box>
              <Label>Share to</Label>
              <Box direction="row" responsive={false}>
                <SocialShare type="email" link={shareLink}
                  title="Found this from the Hewlett Packard Labs website"
                  text={title} />
                <SocialShare type="twitter" link={shareLink} text={title} />
                <SocialShare type="facebook" link={shareLink} />
                <SocialShare type="linkedin" link={shareLink} title={title} />
              </Box>
            </Box>
          </Sidebar>
        </Box>
      </Layer>
    );
  }
}

ShareMenu.propTypes = {
  rnum: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func
};
