import React from 'react'

interface Props {
  name:string
}

function App(props:Props) {
  return (
    <div>
     {props.name}
    </div>
  );
}

export default App;
