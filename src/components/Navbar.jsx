import React, { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';
import logo from '../assets/rc.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 10) {
            setShowNavbar(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setShowNavbar(false);
          } else if (currentScrollY < lastScrollY.current) {
            setShowNavbar(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (itemText, href) => {
    setActiveItem(itemText);

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setMobileOpen(false);
    setTimeout(() => setActiveItem(null), 300);
  };

  const navItems = [
    { text: 'Home', href: '#hero' },
    { text: 'About', href: '#about-hero' },
    { text: 'Events', href: '#gallery' },
    { text: 'Team', href: '#team-profile' },
    { text: 'Contact', href: '#contact' },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        background: '#011528',
        color: 'white',
        padding: '20px',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ marginTop: '40px' }}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component="a"
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.text, item.href);
            }}
            sx={{
              color: 'white',
              borderRadius: '4px',
              margin: '4px 0',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              '&:hover': {
                backgroundColor: 'rgba(191, 157, 54, 0.2)',
                border: '1px solid rgba(191, 157, 54, 0.5)',
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header>
      <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
        {/* Logo on the left */}
        <a href="#" className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="rotaract-text">ROTARACT</span>
        </a>

        {/* Navigation elements on the right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li
                key={item.text}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.text, item.href);
                }}
              >
                <a href={item.href}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              ml: 2,
              display: { sm: 'none' },
              color: 'white',
              padding: '8px',
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </nav>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </header>
  );
};

export default Navbar;