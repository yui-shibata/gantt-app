import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, Link } from "react-router-dom";

const ListItems = () => {
  const [open, setOpen] = useState({});

  const handleToggle = (menu) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [menu]: !prevOpen[menu],
    }));
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleToggle('menu1')}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="ガントチャート" />
        {open['menu1'] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open['menu1']} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton to={`/`}>
            <ListItemText primary="ガントチャート" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleToggle('menu2')}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="管理" />
        {open['menu2'] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open['menu2']} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText primary="ドロップダウン項目1" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="ドロップダウン項目2" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default ListItems;
