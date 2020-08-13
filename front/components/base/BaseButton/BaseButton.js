import React from 'react'
import BaseSpinner from 'base/BaseSpinner'
import createButton from '~/front/components/base/HOC/create-button'

function BaseButton (props) {
  const { onClick, label, type, disabled, loading, className, title } = props

  return (
    <button disabled={disabled} type={type} onClick={onClick} title={title} className={className}>
            <span className="base-button__inner">
                {
                  loading ? <BaseSpinner/> : (label || props.children)
                }
            </span>
    </button>
  )
}

export default createButton(BaseButton, 'base-button')
