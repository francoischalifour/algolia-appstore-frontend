require('dotenv').config()

module.exports = {
  APP_ID: process.env.REACT_APP_ALGOLIA_APP_ID,
  API_KEY: process.env.REACT_APP_ALGOLIA_API_KEY,
  HITS_PER_PAGE: 20,
  INDICES: {
    APPS_RATING_DESC: {
      name: 'apps',
      label: 'Highest rating'
    },
    APPS_RATING_ASC: {
      name: 'apps_rating_asc',
      label: 'Lowest rating'
    }
  }
}
