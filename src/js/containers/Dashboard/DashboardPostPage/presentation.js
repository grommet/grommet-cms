import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Animate from 'grommet/components/Animate';
import Anchor from 'grommet/components/Anchor';
import SettingsOptionIcon from 'grommet/components/icons/base/SettingsOption';
import {
  PageHeader,
  PostPreview,
  PostList,
  PostListItemDetail,
  SectionLayoutForm,
  BoxLayoutForm,
  WithLoading,
  ConfirmLayer
} from 'grommet-cms/components';
import DashboardPostPageNotifier from './notifier';

const CLASS_ROOT = 'dashboard--post-page';

export class DashboardPostPagePresentation extends Component {
  render() {
    const {
      post,
      error,
      sectionLayoutForm,
      boxLayoutForm,
      toastMessage,
      request,
      showSectionLayoutOptions,
      onSubmitBoxLayoutForm,
      onToggleHelp,
      onChangeBoxLayoutForm,
      onSetBoxLayoutFormValues,
      shouldAnimate,
      selectedSection,
      onToggleSectionOptions,
      onChangeSectionForm,
      onSubmitSectionForm,
      onSetSectionFormValues,
      onSectionMenuItemClick,
      onBackToMasterView,
      onCreateBlock,
      onSelectSection,
      onAddSection,
      onClearError,
      onCloseToast,
      layer,
      onCloseLayer,
      onSubmitLayer
    } = this.props;
    // const { selectedSection, shouldAnimate } = this.state;
    const listDisabled = (post && post.sections && !post.sections.length) || request;
    return (
      <Box primary pad="none">
        {layer && layer.isVisible &&
          <ConfirmLayer
            name="this Page Type"
            note="Deleting a page type will delete all of the content associated with it and cannot be undone."
            onClose={onCloseLayer}
            onSubmit={onSubmitLayer}
          />
        }
        <WithLoading isLoading={request && !selectedSection && !shouldAnimate} fullHeight>
          <Split
            className={CLASS_ROOT}
            separator
            flex="right"
            priority="left"
            showOnResponsive="priority"
          >
            <Box className={`${CLASS_ROOT}__split-left`}>
              <Animate
                keep
                enter={{
                  animation: 'slide-right',
                  duration: shouldAnimate ? 500 : 0,
                  delay: 0
                }}
                leave={{ animation: 'slide-left', duration: 500, delay: 0 }}
                visible={selectedSection == null}
              >
                {post && selectedSection == null &&
                  <PostList
                    disabled={listDisabled}
                    onSelectSection={onSelectSection}
                    onMenuItemClick={onSectionMenuItemClick}
                    onAddSection={onAddSection}
                    sections={
                      post.sections
                        ? post.sections.sort((a, b) => a.order - b.order)
                        : null
                    }
                  />
                }
              </Animate>
              <Animate
                keep
                enter={{ animation: 'slide-left', duration: 500, delay: 0 }}
                leave={{ animation: 'slide-left', duration: 500, delay: 0 }}
                visible={typeof selectedSection === 'number'}
              >
                {post && typeof selectedSection === 'number' &&
                  <PostListItemDetail
                    onSubmit={onBackToMasterView}
                    onCreateBlockClick={onCreateBlock}
                    item={post.sections[selectedSection]}
                  />
                }
              </Animate>
            </Box>
            <Box className={`${CLASS_ROOT}__split-right`}>
              <PageHeader
                title="Preview"
                controls={
                  <Anchor
                    disabled={selectedSection == null}
                    onClick={
                      selectedSection != null
                        ? () =>
                            onSectionMenuItemClick(
                              'EDIT_SECTION',
                              selectedSection
                            )
                        : null
                    }
                    icon={<SettingsOptionIcon size="small" />}
                  />
                }
              />
              <Box full="horizontal">
                <PostPreview selectedSection={selectedSection} post={post} />
              </Box>
            </Box>
          </Split>
        </WithLoading>
        <DashboardPostPageNotifier
          error={error}
          onClearError={onClearError}
          onCloseToast={onCloseToast}
          toastMessage={toastMessage}
        />
        <SectionLayoutForm
          {...sectionLayoutForm}
          onToggleHelp={() => onToggleHelp('SECTION')}
          onShowMore={onToggleSectionOptions}
          showAdvancedLayout={showSectionLayoutOptions}
          onChange={onChangeSectionForm}
          isEditing={sectionLayoutForm.selectedSection !== null}
          onClose={() => onSetSectionFormValues(null)}
          onSubmit={onSubmitSectionForm}
        />
        <BoxLayoutForm
          {...boxLayoutForm}
          onToggleHelp={() => onToggleHelp('BOX')}
          onChange={onChangeBoxLayoutForm}
          onClose={() => onSetBoxLayoutFormValues(null)}
          onSubmit={onSubmitBoxLayoutForm}
        />
      </Box>
    );
  }
};

DashboardPostPagePresentation.propTypes = {
  sectionLayoutForm: PropTypes.object,
  boxLayoutForm: PropTypes.object,
  request: PropTypes.bool.isRequired,
  error: PropTypes.string,
  toastMessage: PropTypes.string,
  onSubmitBoxLayoutForm: PropTypes.func.isRequired,
  onToggleHelp: PropTypes.func.isRequired,
  onChangeBoxLayoutForm: PropTypes.func.isRequired,
  onSetBoxLayoutFormValues: PropTypes.func.isRequired,
  shouldAnimate: PropTypes.bool.isRequired,
  selectedSection: PropTypes.number,
  onToggleSectionOptions: PropTypes.func.isRequired,
  onChangeSectionForm: PropTypes.func.isRequired,
  onSubmitSectionForm: PropTypes.func.isRequired,
  onSetSectionFormValues: PropTypes.func.isRequired,
  onSectionMenuItemClick: PropTypes.func.isRequired,
  onBackToMasterView: PropTypes.func.isRequired,
  onCreateBlock: PropTypes.func.isRequired,
  onSelectSection: PropTypes.func.isRequired,
  onAddSection: PropTypes.func.isRequired,
  onClearError: PropTypes.func.isRequired,
  onCloseToast: PropTypes.func.isRequired,
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

export default DashboardPostPagePresentation;
