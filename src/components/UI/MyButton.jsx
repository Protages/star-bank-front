import React from 'react';

const MyButton = ({children, isBlocked, ...props}) => {
    let classNames = ['my_button']
    if (isBlocked) {classNames.push('blocked_btn')}
    
    return (
        <button className={classNames.join(' ')} {...props}>{children}</button>
    )
}

export default MyButton