import React from 'react'
import { connect } from 'react-algoliasearch-helper'
import { INDICES } from '../config'

const sortBy = ({ helper, index }) => {
  helper
    .setIndex(index)
    .search()
}

const Sorting = ({ helper }) =>
  <select
    ref={elem => (this.select = elem)}
    onChange={() => sortBy({ helper, index: this.select.options[this.select.selectedIndex].value })}
  >
    {Object.keys(INDICES)
      .map(i => INDICES[i])
      .map(index =>
        <option
          key={index.name}
          value={index.name}
        >
          {index.label}
        </option>
    )}
  </select>

export default connect()(Sorting)
