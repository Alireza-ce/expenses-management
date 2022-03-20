import Drawer from '@material-ui/core/Drawer';
import React from 'react'
import { Outlet } from 'react-router-dom';
import classes from './panel-layout.module.scss';

function PanelLayout() {
  return (
    <div className={classes.layout}>
      <Drawer anchor="left" variant='permanent' className={classes.drawer} >
        <div className={classes.drawerContent}>
          <p>dashboard</p>
          <p>dashboard</p>
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