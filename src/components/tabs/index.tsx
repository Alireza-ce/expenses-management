import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

interface Props {
    children: any
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CustomTab({ children }: Props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className='tabs'>
            <Tabs value={value} aria-label="basic tabs example">
                <Tab label="Item One" {...a11yProps(0)} onClick={() => { handleChange(0) }} />
                <Tab label="Item two" {...a11yProps(1)} onClick={() => { handleChange(1) }} />
            </Tabs>
            {/* write switch case to handle the component */}
        </div>
    )
}
