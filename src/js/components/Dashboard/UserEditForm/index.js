import React, { PropTypes } from 'react';

import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

export default function UserEditForm(props) {
  return (
    <Form compact={false} onSubmit={props.onSubmit} autoComplete="false">
      <Box align="center" pad="medium">
        <Header pad={{ vertical: 'medium' }}>
          <Heading align="center">{props.title}</Heading>
        </Header>
      </Box>
      <FormFields className="dashboard__user-form">
        <fieldset>
          { props.loggedInRole === 0 &&
            <FormField label="Role" htmlFor="role">
              <Select
                id="role"
                name="role"
                value={props.role}
                options={[
                  {
                    label: 'Admin',
                    value: 0
                  }, {
                    label: 'Editor',
                    value: 1
                  }
                ]}
                onChange={props.onChange}
              />
            </FormField>
          }
          <FormField label="Password" htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              value={props.password}
              onChange={props.onChange}
            />
          </FormField>
          <FormField label="Password Confirm" htmlFor="passwordConfirm">
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={props.passwordConfirm}
              onChange={props.onChange}
            />
          </FormField>
        </fieldset>
        <Box align="center">
          <Button
            onClick={props.onSubmit}
            primary
            type="submit"
            label={props.submitMessage}
          />
        </Box>
      </FormFields>
    </Form>
  );
}

UserEditForm.propTypes = {
  title: PropTypes.string,
  password: PropTypes.string,
  passwordConfirm: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitMessage: PropTypes.string
};

UserEditForm.defaultProps = {
  submitMessage: 'submit'
};
