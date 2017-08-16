import React from 'react'
import { connect } from 'react-algoliasearch-helper'
import Observer from 'react-intersection-observer'
import { css } from 'glamor'
import glamorous from 'glamorous'
import MdLoop from 'react-icons/lib/md/loop'
import { HITS_PER_PAGE } from '../config'

const spinAnimation = css.keyframes({
  '0%': { transform: `rotate(0deg)` },
  '100%': { transform: `rotate(-360deg)` }
})

const loading = css({
  animation: `${spinAnimation} infinite 3s ease`
})

const Footer = glamorous.div({
  padding: '24px',
  textAlign: 'center'
})

const loadMore = ({ helper }) =>
  helper.setQueryParameter('hitsPerPage', helper.getQueryParameter('hitsPerPage') + HITS_PER_PAGE).search()

const Loader = ({ nbPages, nbHits, helper }) =>
  nbPages > 1 &&
  <Observer onChange={() => loadMore({ helper })} render={() =>
    <Footer>
      <MdLoop
        size={72}
        color='#CCC'
        className={loading}
      />
    </Footer>
  } />

export default connect(
  ({ searchResults }) => ({
    nbPages: (searchResults && searchResults.nbPages) || 1,
    nbHits: (searchResults && searchResults.nbHits) || 0
  })
)(Loader)
