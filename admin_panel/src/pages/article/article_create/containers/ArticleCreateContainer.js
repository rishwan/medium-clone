import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ArticlesContext from '../../ArticlesContext'
import * as articleActions from "../../../../modules/articles";
import ArticleCreateForm from '../components/ArticleCreateForm'

class ArticleCreateContainer extends React.Component {
  render () {
    return (
      <ArticlesContext.Provider value={this.props}>
        <React.Fragment>
          <ArticleCreateForm />
        </React.Fragment>
      </ArticlesContext.Provider>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.authReducer.token,
    isFetching: state.articlesReducer.isFetching,
    serverAlert: state.articlesReducer.serverAlert,
    topics: state.articlesReducer.topics,
    tags: state.articlesReducer.tags
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTopics: articleActions.fetchTopics,
    fetchTags: articleActions.fetchTags,
    createArticle: articleActions.createArticle
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreateContainer)