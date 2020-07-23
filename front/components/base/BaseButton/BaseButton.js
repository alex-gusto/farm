import React from 'react'
import classnames from 'classnames'
import BaseSpinner from 'base/BaseSpinner'

export default function BaseButton(props) {
    const { onClick, label, type = 'button', theme = 'main', color, disabled = false, loading = false } = props

    const rootClasses = classnames([
        'base-button',
        `base-button--${theme}`,
        color && `base-button--${color}`,
        {
            'base-button--disabled': disabled
        }
    ])

    return (
        <button disabled={disabled} type={type} onClick={onClick} className={rootClasses}>
            <span className="base-button__inner">
                {
                    loading ? <BaseSpinner/> : (label || props.children)
                }
            </span>
        </button>
    )
}
