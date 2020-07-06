import React from 'react';
import classnames from 'classnames';

export default function (props) {
    const { name, total, onClick, selectable = true, image, className, isNameHidden } = props
    const rootClassName = classnames([
        className,
        'farm-animal',
        {
            'farm-animal--unselectable': !selectable
        }
    ])

    const nameContent = isNameHidden ? '' : <div className="farm-animal-label">
        {name}
        <span>{total}</span>
    </div>

    return (
        <div className={rootClassName} onClick={onClick}>
            {nameContent}
            <img src={image} alt="" className="farm-animal-image"/>
        </div>
    )
}
