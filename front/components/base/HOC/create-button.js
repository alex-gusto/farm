import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default function (WrappedComponent, rootClass) {
  function Button (props) {
    const { className, size, color } = props
    const rootClasses = classnames([
      rootClass,
      `${rootClass}--${size}`,
      `${rootClass}--${color}`,
      className
    ])

    return <WrappedComponent {...props} className={rootClasses}/>
  }

  Button.propTypes = {
    type: PropTypes.oneOf([ 'button', 'submit', 'reset' ]),
    size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
    color: PropTypes.oneOf([ 'orange', 'blue' ]),
    disabled: PropTypes.bool
  }

  Button.defaultProps = {
    type: 'button',
    size: 'medium',
    color: 'orange'
  }

  return Button
}




