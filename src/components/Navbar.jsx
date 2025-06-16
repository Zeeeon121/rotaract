import React, { useState } from 'react';
import { IconButton, Drawer, Box, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Home', href: '#' },
    { text: 'About', href: '#' },
    { text: 'Events', href: '#' },
    { text: 'Team', href: '#' },
    { text: 'Contact', href: '#' },
  ];

  const drawer = (
    <Box sx={{ 
      width: 250,
      height: '100%',
      background: '#011528',
      color: 'white',
      padding: '20px',
      position: 'relative'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        position: 'absolute',
        top: '10px',
        right: '10px'
      }}>
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
            sx={{
              '&:hover': {
                color: '#00aaff',
              }
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem 
          button 
          component="a" 
          href="#"
          sx={{
            border: '1px solid #00aaff',
            borderRadius: '6px',
            marginTop: '10px',
            '&:hover': {
              backgroundColor: '#00aaff',
              color: 'black',
            }
          }}
        >
          <ListItemText primary="Get Started" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">Logo</div>
        </div>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.text}><a href={item.href}>{item.text}</a></li>
          ))}
        </ul>
        
        <div className="nav-right">
          <a href="#" className="get-started">Get Started</a>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ 
              ml: 2, 
              display: { sm: 'none' },
              color: 'white',
              padding: '8px'
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
            keepMounted: true, // Better open performance on mobile.
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