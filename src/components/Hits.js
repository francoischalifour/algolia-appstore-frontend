import React from 'react'
import { connect } from 'react-algoliasearch-helper'
import glamorous from 'glamorous'
import { MdFindInPage, MdSort } from 'react-icons/lib/md'
import { mediaQueries } from '../config/design'
import Sorting from './Sorting'
import Hit from './Hit'

const Main = glamorous.main({
  padding: '16px',
  [mediaQueries.small]: {
    padding: '24px'
  }
})

const Info = glamorous.header({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0 16px 0'
})

const Small = glamorous.small({
  color: '#777'
})

const List = glamorous.ul({
  display: 'grid',
  padding: 0,
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  [mediaQueries.small]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [mediaQueries.medium]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [mediaQueries.xLarge]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
})

const EmptyState = glamorous.div({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  [mediaQueries.small]: {
    padding: '24px'
  }
})

const Hits = ({ results }) => {
  const { nbHits, processingTimeMS, hits } = results

  return results
    ? nbHits > 0
      ? <Main>
        <Info>
          <Small>{nbHits} results ({processingTimeMS} millisecond{processingTimeMS > 1 && 's'})</Small>
          <Sorting />
        </Info>
        <List>
          {hits.map(hit => <Hit key={hit.objectID} {...hit} />)}
        </List>
      </Main>
    : <EmptyState>
      <MdFindInPage
        size={212}
        color='#CCC'
      />
      <p>No apps match your query.</p>
    </EmptyState>
  : <EmptyState>
    <MdSort
      size={212}
      color='#CCC'
    />
    <p>Loading results...</p>
  </EmptyState>
}

export default connect(state => ({
  results: state.searchResults || []
}))(Hits)
