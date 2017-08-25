import React, { Component } from 'react'
import { Provider } from 'react-algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import { css } from 'glamor'
import glamorous from 'glamorous'
import Sidebar from 'react-sidebar'
import MdApps from 'react-icons/lib/md/apps'
import MdMenu from 'react-icons/lib/md/menu'
import {
  APP_ID,
  API_KEY,
  INDICES,
  HITS_PER_PAGE
} from '../config'
import { mediaQueries } from '../config/design'
import SearchBox from './SearchBox'
import RatingFilter from './RatingFilter'
import CategoryFilter from './CategoryFilter'
import Hits from './Hits'
import Loader from './Loader'

const client = algoliasearch(APP_ID, API_KEY)
const helper = algoliasearchHelper(client, INDICES.APPS_RATING_DESC.name, {
  disjunctiveFacets: ['category'],
  facets: ['rating'],
  hitsPerPage: HITS_PER_PAGE
})

helper.search()

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh'
})

const Content = glamorous.main({
  display: 'flex',
  flex: 2,
  flexDirection: 'column',
  [mediaQueries.small]: {
    marginLeft: '256px'
  }
})

const Header = glamorous.header({
  display: 'flex',
  alignItems: 'center',
  height: '70px',
  backgroundColor: '#1F2532',
  color: '#FFF',
  padding: '16px',
  '& h1': {
    fontSize: '1.4rem',
    margin: 0
  }
})

const menuIcon = css({
  cursor: 'pointer',
  marginRight: '24px'
})

const sidebarStyles = {
  root: {
    right: 'auto'
  },
  sidebar: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '256px',
    overflowY: 'scroll',
    height: '100vh',
    padding: '24px',
    color: '#fff',
    backgroundColor: '#1F2532'
  }
}

const mql = window.matchMedia(`(min-width: 768px)`)

const SidebarContent =
  <nav>
    <h1><MdApps /> App Store</h1>
    <h2>Categories</h2>
    <CategoryFilter />
    <h2>Rating from</h2>
    <RatingFilter />
  </nav>

class App extends Component {
  constructor (props) {
    super(props)

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
  }

  componentWillMount () {
    mql.addListener(this.mediaQueryChanged)
    const isLargeScreen = mql.matches

    this.setState({
      mql,
      sidebarOpen: false,
      sidebarShadow: false,
      sidebarTransitions: !isLargeScreen,
      sidebarDocked: isLargeScreen
    })
  }

  componentWillUnmount () {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged () {
    this.setState({
      sidebarTransitions: !this.state.mql.matches,
      sidebarDocked: this.state.mql.matches
    })
  }

  render () {
    const MobileHeader = () =>
      <Header>
        <h1>
          <MdMenu
            className={menuIcon}
            size={32}
            onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}
          />
          App Store
        </h1>
      </Header>

    return (
      <Provider helper={helper}>
        <Container>
          <Sidebar
            sidebar={SidebarContent}
            styles={sidebarStyles}
            open={this.state.sidebarOpen}
            transitions={this.state.sidebarTransitions}
            docked={this.state.sidebarDocked}
            shadow={this.state.sidebarShadow}
            onSetOpen={isOpen => this.setState({ sidebarOpen: isOpen })}
          >{' '}</Sidebar>
          <Content>
            {!this.state.sidebarDocked && <MobileHeader />}
            <SearchBox />
            <Hits />
            <Loader />
          </Content>
        </Container>
      </Provider>
    )
  }
}

export default App
