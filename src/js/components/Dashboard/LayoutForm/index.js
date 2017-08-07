/* @flow */
import React from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import CheckBox from 'grommet/components/CheckBox';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { FlexBoxHelpLayer } from 'grommet-cms/components';

declare type OptionType = {
  value: any,
  label: any
} | string | number;

export default function LayoutForm(props: {
  title: string,
  fields: Array<{
    label: string,
    help: string | { row: string, column: string },
    name: string,
    type: 'Select' | 'CheckBox',
    options: Array<any>,
    value: ?string
  }>,
  showHelp: boolean,
  onToggleHelp: Function,
  onChange: Function
}) {
  const { onChange, title, fields, showHelp, onToggleHelp } = props;
  const flexDirection: string = fields[0].value || "row";
  return (
    <fieldset>
      <Box direction="row" align="center" justify="start">
        <legend>{title}</legend>
        <Button
          plain
          onClick={onToggleHelp}
          icon={<CircleQuestionIcon />}
        />
        <FlexBoxHelpLayer isVisible={showHelp} onClose={onToggleHelp} />
      </Box>
      {fields.map((field, i) => {
        const helpText = typeof field.help === 'object'
          ? field.help[`${flexDirection}`]
          : field.help;
        return (
          <FormField
            key={i}
            help={field.type !== 'CheckBox' && helpText || ''}
            label={field.label}
            htmlFor={field.name}
          >
            {field.type === 'Select' && 
              <Select
                id={field.name}
                name={field.name}
                onChange={({ target, option }) =>
                  onChange({ value: option, name: target.name })
                }
                value={{ value: field.value, label: field.value || '' }}
                options={field.options}
              />
            }
            {field.type === 'CheckBox' && 
              <CheckBox
                id={field.name}
                name={field.name}
                label={helpText}
                checked={(field.value === 'false') ? false : true}
                onChange={({ target }) =>
                  onChange({
                    value: (target.checked) ? 'true' : 'false',
                    name: target.name
                  })
                }
              />
            }
          </FormField>
        );
      })}
    </fieldset>  
  );
}

