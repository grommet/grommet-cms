/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import { MarqueeForm } from 'grommet-cms/components';

export default function AddPostForm(props: {
  isVisible: boolean,
  onClose: Function,
  isEditing: boolean,
  form: {
    onSubmit: Function,
    post?: {
      title?: string,
      subtitle?: string,
      date?: string,
      image?: string
    },
    url?: string,
    onChange: Function,
    onCancel: Function
  }
}) {
  const { isVisible, onClose, form, isEditing } = props;
  const { onSubmit, post, onChange, url, onCancel } = form;
  return (
    <Layer
      closer
      align="right"
      onClose={onClose}
      hidden={!isVisible}
    >
      <Header pad="medium" align="center">
        <Heading align="center" strong>
          {isEditing ? 'Edit Page' : 'Add Page'}
        </Heading>
      </Header>
      <MarqueeForm
        onSubmit={onSubmit}
        post={post}
        onChange={onChange}
        onCancel={onCancel}
        url={url}
      />
    </Layer>
  );
}
