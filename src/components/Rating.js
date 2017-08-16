import React from 'react'
import PropTypes from 'prop-types'
import MdStar from 'react-icons/lib/md/star'
import MdStarHalf from 'react-icons/lib/md/star-half'
import MdStarBorder from 'react-icons/lib/md/star-border'

const isDecimal = x => x % 1 !== 0

const Rating = ({ value, color = '', max = 5 }) =>
  <span>
    {Array.from({ length: Math.floor(value) }, (v, i) => <MdStar key={`star-${i}`} color={color} />)}
    {isDecimal(value) && <MdStarHalf key={`star-half`} color={color} />}
    {Array.from({ length: max - Math.ceil(value) }, (v, i) => <MdStarBorder key={`star-empty-${i}`} color={color} />)}
  </span>

Rating.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  max: PropTypes.number
}

export default Rating
