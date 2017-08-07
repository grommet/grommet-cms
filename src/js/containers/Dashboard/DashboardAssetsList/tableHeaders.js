// @flow

const headers = ['', 'Title', 'File Name', 'Created At', 'Created By', '', ''];

export const map = {
  '': '',
  Title: 'title',
  'File Name': 'path',
  'Created At': 'createdAt',
  'Created By': 'createdBy'
};

export function fromIndex(index: number): string {
  return map[
    headers[
      index
    ]
  ];
}

export default headers;
