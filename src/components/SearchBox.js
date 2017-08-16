import React from 'react'
import { connect } from 'react-algoliasearch-helper'
import glamorous from 'glamorous'
import MdSearch from 'react-icons/lib/md/search'
import { HITS_PER_PAGE } from '../config'
import { mediaQueries } from '../config/design'

const Box = glamorous.div({
  alignItems: 'center',
  boxShadow: '0 2px 3px -1px rgba(0, 0, 0, .16)',
  width: '100%',
  background: '#FFF',
  transition: 'all 300ms',
  padding: '16px',
  [mediaQueries.small]: {
    padding: '24px'
  }
})

const Input = glamorous.input({
  outline: 'none',
  width: '100%',
  background: '#FFF',
  border: 'none',
  fontSize: '24px',
  fontFamily: 'inherit',
  marginLeft: '16px',
  WebkitAppearance: 'textfield'
})

const Label = glamorous.label({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
})

const onSearch = ({ helper, value }) => {
  helper.setQuery(value).search()

  // If the user has scrolled, `hitsPerPage` is no longer sets
  // to its default value. We therefore need to reset it.
  if (helper.getQueryParameter('hitsPerPage') !== HITS_PER_PAGE) {
    helper.setQueryParameter('hitsPerPage', HITS_PER_PAGE)
  }
}

const SearchBox = ({ helper }) =>
  <Box>
    <Label for='search'>
      <MdSearch size={32} color='#BBB' />
      <Input
        id='search'
        type='search'
        placeholder='Search for apps'
        autoFocus
        onChange={({ target: { value } }) => onSearch({ helper, value })}
      />
    </Label>
  </Box>

export default connect()(SearchBox)
