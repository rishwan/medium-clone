import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ArticlesContext from '../../ArticlesContext'
import * as articleActions from '../../../../modules/articles'
import ArticleEditForm from '../components/ArticleEditForm'

class ArticleEditContainer extends React.Component {

  componentDidMount () {
    this.props.fetchTopics()
    this.props.fetchTags()
    this.props.fetchArticle(this.props.match.params.id)
  }

  render () {
    return (
      <ArticlesContext.Provider value={this.props}>
        <React.Fragment>
          <ArticleEditForm />
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
    tags: state.articlesReducer.tags,
    article: state.articlesReducer.article
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTopics: articleActions.fetchTopics,
    fetchTags: articleActions.fetchTags,
    fetchArticle: articleActions.fetchArticle,
    updateArticle: articleActions.updateArticle
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditContainer)