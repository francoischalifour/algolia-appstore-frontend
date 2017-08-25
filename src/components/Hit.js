import React from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'
import {
  numberWithSeparator,
  formatUSD
} from '../utils'
import { MAX_RATING } from '../config'
import Rating from './Rating'

const Li = glamorous.li({
  display: 'flex',
  flex: 1,
  background: '#FFF',
  boxShadow: '0 2px 4px -2px rgba(0, 0, 0, .16), 0 1px 2px #eee',
  padding: '16px',
  borderRadius: '2px',
  lineHeight: '1.4em'
})

const Header = glamorous.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '> a': {
    textDecoration: 'none',
    color: '#263238',
    fontWeight: 'bold'
  },
  '& em': {
    fontStyle: 'inherit',
    fontWeight: 'bold',
    backgroundColor: '#FFEB3B'
  }
})

const Aside = glamorous.aside({
  paddingRight: '16px'
})

const Img = glamorous.img({
  width: '48px'
})

const Main = glamorous.main({
  flex: 5
})

const Price = glamorous.div({
  flex: 2,
  textAlign: 'right',
  color: '#777'
})

const getHighlighted = string => ({__html: string})

const Hit = ({
  _highlightResult: { name: { value: highlightedName } },
  name,
  category,
  image,
  link,
  price,
  rating,
  ratingCount
}) =>
  <Li>
    <Aside>
      <a href={link} target='blank' rel='noopener'>
        <Img src={image} alt={name} />
      </a>
    </Aside>

    <Main>
      <Header>
        <a href={link} target='blank' rel='noopener' dangerouslySetInnerHTML={getHighlighted(highlightedName)} />
      </Header>

      <small>in <strong>{category}</strong></small>

      <footer title={`Rating: ${rating}/${MAX_RATING}`}>
        <Rating value={rating} max={MAX_RATING} color='#FFC107' />

        {' '}<small>({numberWithSeparator(ratingCount)} ratings)</small>
      </footer>
    </Main>

    <Price>
      <strong>{price === '0 USD' ? 'Free' : formatUSD(price)}</strong>
    </Price>
  </Li>

Hit.propTypes = {
  highlightedName: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number
}

export default Hit
