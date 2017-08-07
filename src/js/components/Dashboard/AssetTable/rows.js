// @flow
import React from 'react';
import AssetTableRow from './row';
import { highlightContent, uuid } from 'grommet-cms/utils';

type Asset = any;
export type Props = {
  assets: Asset[],
  children?: React$Element<*>,
  searchTerm: string,
  allowMultiSelect: boolean,
  onClickMenu: (action: any, item: any) => void,
  onClickCheckbox: (index: number, checked: boolean) => void,
  requiresSearch: boolean,
  checkedIndices: number[]
}

export default function AssetTableRows({
  assets,
  searchTerm,
  requiresSearch,
  onClickCheckbox,
  onClickMenu,
  allowMultiSelect,
  children,
  checkedIndices
}: Props): React$Element<*> {
  if (!assets.length && children) {
    return React.cloneElement(children);
  }
  return (
    <tbody style={{ minHeight: 500 }}>
      {assets.map((item, index) => {
        const imagePath = item.path ? item.path.split('/')[item.path.split('/').length - 1] : null;
        const path = (searchTerm !== '' && !requiresSearch)
          ? highlightContent(searchTerm, imagePath)
          : imagePath;
        const title = (searchTerm !== '' && !requiresSearch)
          ? highlightContent(searchTerm, item.title)
          : item.title;
        const props = {
          ...item,
          title,
          path,
          fullPath: item.path
        };
        return (
          <AssetTableRow
            checked={checkedIndices.indexOf(index) >= 0}
            key={uuid()}
            onClickCheckbox={(checked) => onClickCheckbox(index, checked)}
            onClickMenu={(action) => onClickMenu(action, item)}
            allowMultiSelect={allowMultiSelect}
            {...props}
          />
        );
      })}
    </tbody>
  );
}
