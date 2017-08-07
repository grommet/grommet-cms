import { PropTypes } from 'react';

export default {
  url: PropTypes.string,
  sectionLayoutForm: PropTypes.object,
  boxLayoutForm: PropTypes.object,
  contentBlocks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }),
  postSectionLayoutSubmission: PropTypes.object,
  boxLayoutFormSubmission: PropTypes.array,
  request: PropTypes.bool.isRequired,
  error: PropTypes.string,
  toastMessage: PropTypes.string,
  showSectionLayoutOptions: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    )
  })
};
