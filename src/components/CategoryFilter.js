import React from 'react'
import glamorous from 'glamorous'
import { connect } from 'react-algoliasearch-helper'
import Category from './Category'

const Ul = glamorous.ul({
  lineHeight: '2.6rem',
  listStyle: 'none',
  padding: 0
})

const CategoryFilter = ({ categories, helper }) =>
  (helper.lastResults && helper.lastResults.nbHits === 0)
  ? <p>No categories matching</p>
  : categories.length > 0
    ? <Ul>
      {categories.map(category =>
        <Category
          key={category.name}
          {...category}
          handleClick={() => helper.toggleRefine('category', category.name).search()}
        />
      )}
    </Ul>
    : <p>Loading...</p>

export default connect(state => ({
  categories: (state.searchResults &&
    state.searchResults.getFacetValues('category', { sortBy: ['count:desc', 'name:asc'] })) ||
    []
}))(CategoryFilter)
