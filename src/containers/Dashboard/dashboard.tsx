import Drawer from '@material-ui/core/Drawer';
import React from 'react'
import classes from './panel-layout.module.scss';

function DashboardPage() {
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
        {/* outlet */}
      </div>
    </div>
  )
}

export default DashboardPage;