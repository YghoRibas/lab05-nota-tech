import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { NavItemRoot, NavItemSub } from './nav-item';
import { PaperStyle } from './style';
import { matchPath } from 'react-router-dom';
import { NavItem } from '../nav-config';

function getActive(path: string, pathname: string) {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}

export interface NavListRootProps {
  list: NavItem;
}

export function NavListRoot({ list }: NavListRootProps) {
  const menuRef = useRef(null);

  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const [_, setDrawerStatus] = useState(false)

  const hasChildren = list.children;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          open={open}
          item={list}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpen,
              onMouseLeave: handleClose
            }
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return (
    <NavItemRoot
      item={list}
      active={active}
    />
  );
}

export interface NavListSubProps {
  list: NavItem
}

function NavListSub({ list }: NavListSubProps) {
  const menuRef = useRef(null);

  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          ref={menuRef}
          open={open}
          item={list}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpen,
              onMouseLeave: handleClose
            }
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}