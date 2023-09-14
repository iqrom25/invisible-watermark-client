import React from 'react'

const Button= React.forwardRef((props,ref) => {
    const {onClick} = props;

    const handleClick = ()=>{
        ref ? onClick(ref): onClick();
    }
  
    return (
        <>
        <button onClick={handleClick} className='btn btn-secondary my-3'>
            {props.children}
        </button>
        </>
    ) 
})
export default Button;