import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ArticlesContext from '../../ArticlesContext'
import * as articleActions from '../../../../modules/articles'
import ArticleListingTable from '../components/ArticeListingTable'

class ArticleListContainer extends React.Component {

  componentDidMount () {
    this.props.fetchArticles()
  }


  render () {
    return (
      <ArticlesContext.Provider value={this.props}>
        <React.Fragment>
          <ArticleListingTable />
        </React.Fragment>
      </ArticlesContext.Provider>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.authReducer.token,
    isFetching: state.articlesReducer.isFetching,
    articles: state.articlesReducer.articles,
    serverAlert: state.articlesReducer.serverAlert
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchArticles: articleActions.fetchArticles,
    deleteArticle: articleActions.deleteArticle
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)