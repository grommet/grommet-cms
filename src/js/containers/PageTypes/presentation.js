import React from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import { WithLoading, ConfirmLayer, ErrorNotification } from 'grommet-cms/components';
import PageTypeList from './list';

export default function PageTypesPresentation({
  pageTypes,
  onMenuItemClick,
  layer,
  onCloseLayer,
  onSubmitLayer,
  isLoading,
  error,
  onClearError
}) {
  return (
    <WithLoading isLoading={isLoading}>
      <Box>
        {layer && layer.isVisible &&
          <ConfirmLayer
            name="this Page Type"
            note="Deleting a page type will delete all of the content associated with it and cannot be undone."
            onClose={onCloseLayer}
            onSubmit={onSubmitLayer}
          />
        }
        <Article
          primary
          align="center"
          style={{ maxHeight: 'calc(100vh - 124px)', overflow: 'auto' }}
        >
          <PageTypeList
            onMenuItemClick={onMenuItemClick}
            pageTypes={pageTypes}
          />
        </Article>
        {error &&
          <ErrorNotification
            onClose={onClearError}
            errors={typeof error === 'string' ? [{ message: error }] : [error]}
          />
        }
      </Box>
    </WithLoading>
  );
}
