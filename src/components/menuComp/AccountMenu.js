import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import './AccountMenu.css';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem('token');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = (event) => {
    if (!token) {
      event.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Tooltip title="Menu">
          <props.icon
            className="Icon"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </props.icon>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.8,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 24,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link className="link" to="/admin" onClick={handleLinkClick}>
          <MenuItem>
            <Avatar />
            Admin
          </MenuItem>
        </Link>
        <Link className="link" to="/guides" onClick={handleLinkClick}>
          <MenuItem>
            <Avatar />
            Guides
          </MenuItem>
        </Link>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Link to="/missions" onClick={handleLinkClick}>
          <MenuItem>
            <Avatar /> Daily Missions
          </MenuItem>
        </Link>
        <Link to="/map">
          <MenuItem>
            <Avatar /> Management Map
          </MenuItem>
        </Link>
        <Divider />
        <Link to="admin/addUser" onClick={handleLinkClick}>
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add account
          </MenuItem>
        </Link>
        <Link to="login" onClick={handleLinkClick}>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
