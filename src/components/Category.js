import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

const Li = glamorous.li({
  position: 'relative',
  '& > label': {
    display: 'block',
    cursor: 'pointer'
  }
})

const Badge = glamorous.small({
  position: 'absolute',
  top: '10px',
  right: '0',
  backgroundColor: 'rgba(255, 255, 255, .9)',
  color: '#263238',
  borderRadius: '10px',
  minWidth: '10px',
  padding: '3px 7px',
  lineHeight: '11px'
})

const CheckBox = glamorous.input({
  outlineColor: '#FFC107',
  display: 'inline-block',
  float: 'left',
  width: '24px',
  height: '24px',
  position: 'relative',
  appearance: 'none',
  border: 'none',
  textAlign: 'center',
  margin: '8px 8px 0 0',
  borderRadius: '1px',
  lineHeight: '42px',
  cursor: 'pointer',
  background: '#FFF',
  '&:checked::before': {
    content: '""',
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    background: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 62 46" xmlns="http://www.w3.org/2000/svg"><path d="M60.467 1.54c-1.562-1.562-4.096-1.562-5.658 0L20.866 35.48 7.194 21.806c-1.562-1.562-4.095-1.562-5.657 0-1.562 1.562-1.562 4.095 0 5.657L18.04 43.966c.78.78 1.805 1.172 2.83 1.172 1.023 0 2.046-.39 2.828-1.172l36.77-36.77c1.56-1.562 1.56-4.094 0-5.656z" fill="%231F2532" fill-rule="evenodd"/></svg>') no-repeat center center / 70%`
  }
})

const Category = ({
  name,
  count,
  isRefined = false,
  handleClick
}) =>
  <Li>
    <label>
      <CheckBox
        type='checkbox'
        checked={isRefined}
        onChange={handleClick}
      />
      {' '}
      {name}
      <Badge>{count}</Badge>
    </label>
  </Li>

Category.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isRefined: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}

export default Category
