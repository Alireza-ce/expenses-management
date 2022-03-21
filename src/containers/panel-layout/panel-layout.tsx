import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import classes from './panel-layout.module.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function PanelLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const sideBarLinks = [
    {
      text: 'Dashboard',
      path: '/panel',
      icon: <DashboardIcon />
    },
    {
      text: 'Report',
      path: '/panel/dashboard',
      icon: <AttachMoneyIcon />
    }
  ]

  return (
    <div className={classes.layout}>
      <Drawer anchor="left" variant='permanent' className={classes.drawer} >
        <div className={classes.drawerContent}>
          <div className={classes.userInfo}>
            <img src={require('../../assets/img/avatar.png')} alt="user-icon" />
            <p>user name</p>
          </div>
          <Divider />
          <List>
            {sideBarLinks.map(link => (
              <ListItem key={link.text} button onClick={() => { navigate(link.path, { replace: false }); }} className={location.pathname === link.path ? classes.activeLink : undefined}>
                <ListItemIcon style={{ minWidth: 34 }}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text}></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <div className={classes.layoutContent}>
        {/* toolbar */}
        <Outlet />
      </div>
    </div>
  )
}

export default PanelLayout;
