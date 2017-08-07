/* @flow */
import React from 'react';
import { SectionLayoutRenderer } from 'grommet-cms-content-blocks';
import type ContentBlockType from './flowTypes';
import type { Asset } from 'grommet-cms/containers/Dashboard/Assets/flowTypes';

export type Props = {
  post?: {
    image: Asset,
    title: string,
    subtitle?: string,
    sections?: Array<{
      contentBlocks: Array<ContentBlockType>,
      layout: Array<{
        value: string,
        name: string
      }>
    }>
  },
  selectedSection?: number
};

export default function PostPreview({ post, selectedSection }: Props) {
  if (!post || !post.sections) {
    return null;
  }
  if (selectedSection !== null) {
    return (
      <div>
        {post.sections
          .filter((_,i) => selectedSection === i)
          .map((item, i) => 
            <SectionLayoutRenderer
              key={i}
              section={item}
            />
        )}
      </div>
    );
  }
  return (
    <div>
      {post.sections.map((item, i) => 
        <SectionLayoutRenderer
          key={i}
          section={item}
        />
      )}
    </div>
  );
}
