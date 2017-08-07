import React from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Image from 'grommet/components/Image';
import Toast from 'grommet/components/Toast';
import Anchor from 'grommet/components/Anchor';
import { WithLoading, ErrorNotification } from 'grommet-cms/components';
import { Assets } from 'grommet-cms/containers';

export default function SettingsPresentation({
  onChange,
  form,
  onSubmit,
  isLoading,
  error,
  onRemoveLogo,
  onClearErrors,
  onAssetSelect,
  message,
  onClearMessage
}) {
  return (
    <Box pad="medium">
      {message &&
        <Toast
          status="ok"
          onClose={onClearMessage}
        >
          {message}
        </Toast>
      }
      <Form>
        <FormFields>
          <fieldset>
            <FormField htmlFor="branding-title" label="Title">
              <TextInput
                id="branding-title"
                onDOMChange={onChange}
                value={form.branding.title || ''}
              />
            </FormField>
            <FormField htmlFor="branding-logo" label="Logo">
              <Box direction="row" align="center" justify="between" pad={{ vertical: 'small' }}>
                <Box pad={{ horizontal: 'medium' }}>
                  <Assets onAssetSelect={(asset) => onAssetSelect(asset, 'branding')} />
                </Box>
                {form.branding.logo && form.branding.logo.path &&
                  <Box style={{ flexGrow: 1 }} pad={{ horizontal: 'medium' }}>
                    <Box pad={{ horizontal: 'small' }}>
                      <Box pad={{ vertical: 'small', horizontal: 'medium' }} align="start">
                        <Image style={{ width: 48 }} size="small" src={form.branding.logo.path} />
                      </Box>
                      <Box pad={{ vertical: 'small', horizontal: 'medium' }} align="start">
                        <Anchor onClick={onRemoveLogo} label="Remove" />
                      </Box>
                    </Box>
                  </Box>
                }
              </Box>
            </FormField>
            <FormField htmlFor="branding-theme" label="Theme">
              <Select
                id="branding-theme"
                onChange={({ value }) => onChange({
                  target: {
                    value,
                    id: 'branding-theme'
                  }
                })}
                options={form.branding.theme.options}
                value={form.branding.theme.value}
              />
            </FormField>
          </fieldset>
        </FormFields>
        <WithLoading isLoading={isLoading}>
          <Box pad={{ vertical: 'medium' }} direction="row">
            <Button
              label="submit"
              onClick={onSubmit}
              type='submit'
              primary
            />
          </Box>
        </WithLoading>
        {error && 
          <ErrorNotification
            onClose={onClearErrors}
            errors={error ? [error] : null}
          />
        }
      </Form>
    </Box>
  );
}
