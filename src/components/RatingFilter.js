import React, { Component } from 'react'
import { connect } from 'react-algoliasearch-helper'
import glamorous from 'glamorous'
import { MAX_RATING } from '../config'
import Rating from './Rating'

const Ul = glamorous.ul({
  lineHeight: '1.6em',
  fontSize: '1.1rem'
})

const Li = glamorous.li({
  cursor: 'pointer'
})

class RatingFilter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ratingFilter: null
    }

    this.refineRating = this.refineRating.bind(this)
  }

  refineRating ({ rating, helper }) {
    // Get the current rating
    const ratingFilter = this.state.ratingFilter

    // Remove all rating refinements
    helper.clearRefinements('rating')

    // Add the new rating refinement only if different from the previous one.
    // Otherwise, don't add it so it mimics a "toggle" effect
    if (rating !== ratingFilter) {
      helper.addNumericRefinement('rating', '>=', rating)
    }

    helper.search()

    this.setState({
      ratingFilter: (helper.getNumericRefinement('rating', '>=') || [])[0] || null
    })
  }

  render () {
    const { helper } = this.props

    return (
      <Ul>
        {Array.from({ length: MAX_RATING }).map((_, rating) =>
          <Li
            key={rating}
            title={`${rating}/${MAX_RATING} and up`}
            onClick={() => this.refineRating({ rating, helper })}
          >
            <Rating
              value={rating}
              color={this.state.ratingFilter === rating ? '#FFEB3B' : ''}
            />
          </Li>
        )}
      </Ul>
    )
  }
}

export default connect()(RatingFilter)
