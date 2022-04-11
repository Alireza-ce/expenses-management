import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

export default function Spinner() {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <CircularProgress style={{ color: "white" }} />
        </div>
    )
}
