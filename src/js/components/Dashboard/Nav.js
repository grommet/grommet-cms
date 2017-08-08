import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Image from 'grommet/components/Image';
import userthumb from '../../../img/dashboard/user-thumb.jpg';

const CLASS_ROOT = 'grommet-cms-header';

export default function Nav({
  onLogoutClick,
  leftAnchor,
  navLinks,
  title,
  logo,
  params,
  location,
  pageMenu,
  user
}) {
  const titleElement = (
    <Anchor
      style={{ display: 'flex', alignItems: 'center' }}
      animateIcon
      align="center"
      icon={logo || null}
      path="/dashboard/homepage"
      label={
        title
          ? <Heading style={{ margin: '0px 0px 0 10px' }} strong tag="h4">
            {title}
          </Heading>
          : null
      }
    />
  );
  return (
    <Header
      className={CLASS_ROOT}
      justify="between"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      colorIndex="neutral-1"
      align="center"
      size="small"
    >
      {leftAnchor
        ? <Box>
          {leftAnchor}
        </Box>
        : <Box direction="row" align="center">
          {titleElement}
        </Box>}
      <Box
        direction="row"
        responsive={false}
        align="center"
        pad={{ between: 'medium' }}
      >
        <Menu label="Menu" inline direction="row">
          {pageMenu && pageMenu.length
            ? <Menu label="Page Types">
              {pageMenu.map((item, i) => (
                <Anchor
                  key={i}
                  className={params && params.type === item.slug ? 'active' : ''}
                  label={item.label}
                  path={`/dashboard/posts/${item.slug}`}
                />
              ))}
            </Menu>
            : null}
          {navLinks &&
            navLinks.map((item, i) => {
              if (item.type && item.type === 'Menu') {
                if (!item.role.includes(user.role)) {
                  return null;
                }
                return (
                  <Menu key={i} label="Admin">
                    {item.children.map(child =>
                      child.role.map(
                        itemRole =>
                          itemRole === user.role &&
                          <Anchor
                            key={i}
                            className={location.pathname === child.path ? 'active' : ''}
                            path={child.path}
                            label={child.label}
                          />
                      )
                    )}
                  </Menu>
                );
              }
              return item.role.map(
                itemRole =>
                  itemRole === user.role &&
                  <Anchor key={i} path={item.path} label={item.label} />
              );
            })}
        </Menu>
        <Menu
          responsive
          inline={false}
          dropAlign={{ right: 'right' }}
          icon={
            <Image
              src={userthumb}
              style={{
                borderRadius: 25,
                width: '25px',
                height: '25px'
              }}
            />
          }
        >
          <Anchor path={`/dashboard/users/${user._id}`}>
            Change Password
          </Anchor>
          <Anchor target="_blank" href="https://grommet.github.io/grommet-cms">
            Docs
          </Anchor>
          <Anchor onClick={onLogoutClick}>
            Sign Out
          </Anchor>
        </Menu>
      </Box>
    </Header>
  );
}

Nav.propTypes = {
  leftAnchor: PropTypes.node,
  onLogoutClick: PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  logo: React.PropTypes.element,
  params: React.PropTypes.shape({
    type: React.PropTypes.string
  }),
  navLinks: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      path: React.PropTypes.string
    })
  ).isRequired
};
