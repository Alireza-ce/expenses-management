import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import classes from './panel-layout.module.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ToolBar from './../../components/toolbar';
import { useAuth } from '../../hooks/context/AuthProvider';

function PanelLayout() {
  const [showDrawer, setShowDrawer] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logOut } = useAuth();
  const sideBarLinks = [
    {
      text: 'Dashboard',
      path: '/panel',
      icon: <DashboardIcon />
    },
    {
      text: 'Report',
      path: '/panel/report',
      icon: <AttachMoneyIcon />
    }, {
      text: 'LogOut',
      path: '/logout',
      icon: <LogoutIcon />
    }
  ]

  const clickListItem = (link: any) => {
    if (link.text === 'LogOut') {
      logOut();
      localStorage.removeItem('token');
      navigate('/', { replace: false })
    } else {
      navigate(link.path, { replace: false });
    }
  }

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowDrawer(false)
    }
  }, [])

  return (
    <div className={classes.layout}>
      {showDrawer && <Drawer anchor="left" variant='permanent' className={classes.drawer} >
        <div className={classes.drawerContent}>
          <div className={classes.userInfo}>
            <img src={require('../../assets/img/avatar.png')} alt="user-icon" />
            <p>{currentUser?.email}</p>
          </div>
          <Divider />
          <List>
            {sideBarLinks.map(link => (
              <ListItem key={link.text} button onClick={() => clickListItem(link)} className={location.pathname === link.path ? classes.activeLink : undefined}>
                <ListItemIcon style={{ minWidth: 34 }}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text}></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      }

      {!showDrawer && <div className={classes.mobile_links}>
        {sideBarLinks.map(link => (
          <p key={link.text}  onClick={() => clickListItem(link)} className={location.pathname === link.path ? classes.activeLink : undefined}>
            {link.text}
          </p>
        ))}
      </div>}

      <div className={classes.layoutContent}>
        {/* <ToolBar /> */}
        <div className={classes.routerOutlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PanelLayout;
