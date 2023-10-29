import { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';
import { ListItemStyle } from './style';
import Iconify from 'src/modules/@shared/components/iconify';
import { NavItem } from '../nav-config';
import { Action } from 'src/modules/@shared/domain/utils/func';

function isExternalLink(path: string) {
  return path.includes('http');
}

export interface NavItemRoot {
  item: NavItem;
  active: boolean;
  open?: boolean;
  onClick?: Action<[]>;
  onMouseEnter?: Action<[]>;
  onMouseLeave?: Action<[]>;
}

export const NavItemRoot = forwardRef<HTMLButtonElement, NavItemRoot>(({ item, active, open, onMouseEnter, onMouseLeave, onClick }, ref) => {
  const { title, path, icon, enabled, children } = item;

  if (children) {
    return (
      <ListItemStyle enabled={enabled} onClick={onClick} ref={ref} open={open} activeRoot={active} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle enabled={enabled} onClick={onClick} component={Link} href={path} target="_blank" rel="noopener">
      <NavItemContent icon={icon} title={title} children={children} />
    </ListItemStyle>
  ) : (
    <ListItemStyle enabled={enabled} onClick={onClick} component={RouterLink} to={path} activeRoot={active}>
      <NavItemContent icon={icon} title={title} children={children} />
    </ListItemStyle>
  );
});


export const NavItemSub = forwardRef<HTMLButtonElement, any>(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
  const { title, path, icon, enabled, children } = item;

  if (children) {
    return (
      <ListItemStyle
        enabled={enabled}
        ref={ref}
        subItem
        disableRipple
        open={open}
        activeSub={active}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle enabled={enabled} subItem href={path} disableRipple rel="noopener" target="_blank" component={Link}>
      <NavItemContent icon={icon} title={title} children={children} subItem />
    </ListItemStyle>
  ) : (
    <ListItemStyle enabled={enabled} disableRipple component={RouterLink} to={path} activeSub={active} subItem>
      <NavItemContent icon={icon} title={title} children={children} subItem />
    </ListItemStyle>
  );
});

export interface NavItemContentProps {
  children?: NavItem[];
  icon: any;
  subItem?: boolean;
  title: string;
}

export function NavItemContent({ icon, title, children, subItem }: NavItemContentProps) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5
          }}
        />
      )}
    </>
  );
}