import React, { PropTypes } from 'react';
import Remarkable from 'remarkable';

export default function Markdown ({ content }) {
  const md = new Remarkable();
  const rawMarkup = md.render(content.toString());
  const markup = {__html: rawMarkup};

  return (
    <div dangerouslySetInnerHTML={markup} />
  );
}

Markdown.propTypes = {
  content: PropTypes.string.isRequired
};
