import api from '../lib/api'
import { push } from 'react-router-redux'

/**
 * Constants
 */
const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST'
const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
const FETCH_ARTICLES_FAIL  = 'FETCH_ARTICLES_FAIL'

const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCESS'
const FETCH_TOPICS_FAIL = 'FETCH_TOPICS_FAIL'

const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL'

const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST'
const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS'
const CREATE_ARTICLE_FAIL = 'CREATE_ARTICLE_FAIL'

const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS'
const DELETE_ARTICLE_FAIL = 'DELETE_ARTICLE_FAIL'

const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST'
const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS'
const FETCH_ARTICLE_FAIL = 'FETCH_ARTICLE_FAIL'

const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST'
const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS'
const UPDATE_ARTICLE_FAIL = 'UPDATE_ARTICLE_FAIL'

/**
 * Actions
 */
function updateArticleRequest () {
  console.log('updateArticleRequest')
  return {
    type: UPDATE_ARTICLE_REQUEST,
    payload: {
      isFetching: true,
      article: null
    }
  }
}

function updateArticleSuccess (data) {
  console.log('updateArticleSuccess')
  return {
    type: UPDATE_ARTICLE_SUCCESS,
    payload: {
      isFetching: false,
      article: data.result.article
    }
  }
}

function updateArticleFail () {
  console.log('updateArticleFail')
  return {
    type: UPDATE_ARTICLE_FAIL,
    payload: {
      isFetching: false,
      article: null
    }
  }
}

function fetchArticleSuccess (data) {
  console.log('fetchArticleSuccess')
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: {
      isFetching: false,
      article: data.result.article
    }
  }
}

function fetchArticleFail () {
  console.log('fetchArticleFail')
  return {
    type: FETCH_ARTICLE_FAIL,
    payload: {
      isFetching: false,
      article: null
    }
  }
}

function deleteArticleSuccess (data) {
  console.log('deleteArticleSuccess')
  return {
    type: DELETE_ARTICLE_SUCCESS,
    payload: {
      articles: data
    }
  }
}

function deleteArticleFail () {
  console.log('deleteArticleFail')
  return {
    type: DELETE_ARTICLE_FAIL,
    payload: {
      articles: null
    }
  }
}

function createArticleRequest () {
  console.log('createArticleRequest')
  return {
    type: CREATE_ARTICLE_REQUEST,
    payload: {
      isFetching: true
    }
  }
}

function createArticleSuccess (data) {
  console.log('createArticleSuccess')
  return {
    type: CREATE_ARTICLE_SUCCESS,
    payload: {
      isFetching: false,
      article: data.result.article
    }
  }
}

function createArticleFail () {
  console.log('createArticleFail')
  return {
    type: CREATE_ARTICLE_FAIL,
    payload: {
      isFetching: false,
      article: null
    }
  }
}

function fetchTagsSuccess (data) {
  console.log('fetchTagsSuccess')
  return {
    type: FETCH_TAGS_SUCCESS,
    payload: {
      tags: data.result.tags
    }
  }
}

function fetchTagsFail () {
  console.log('fetchTagsFail')
  return {
    type: FETCH_TAGS_FAIL,
    payload: {
      tags: null
    }
  }
}

function fetchTopicsSuccess (data) {
  console.log('fetchTopicsSuccess')
  return {
    type: FETCH_TOPICS_SUCCESS,
    payload: {
      topics: data.result.topics
    }
  }
}

function fetchTopicsFail () {
  console.log('fetchTopicsFail')
  return {
    type: FETCH_TOPICS_FAIL,
    payload: {
      topics: null
    }
  }
}

function fetchArticleRequest () {
  console.log('fetchArticleRequest')
  return {
    type: FETCH_ARTICLES_REQUEST,
    payload: {
      isFetching: true,
      articles: null
    }
  }
}

function fetchArticlesSuccess (data) {
  console.log('fetchArticlesSuccess')
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: {
      isFetching: false,
      articles: data.result.articles
    }
  }
}

function fetchArticlesFail () {
  console.log('fetchArticlesFail')
  return {
    type: FETCH_ARTICLES_FAIL,
    payload: {
      isFetching: false,
      articles: null,
      topics: []
    }
  }
}

/**
 * Action Dispatchers
 */
export function fetchTags () {
  return dispatch => {
    api
      .get('/tags/index')
      .then(response => {
        if (response.data.status === 'ok') {
          dispatch(fetchTagsSuccess(response.data))
        } else {
          dispatch(fetchTagsFail())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchTagsFail())
      })
  }
}

export function fetchArticles () {
  return dispatch => {
    dispatch(fetchArticleRequest())
    api
      .get('/articles/index')
      .then(response => {
        console.log(response)
        if (response.data.status === 'ok') {
          dispatch(fetchArticlesSuccess(response.data))
        } else {
          dispatch(fetchArticlesFail())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchArticlesFail())
      })
  }
}

export function fetchTopics () {
  return dispatch => {
    api
      .get('/topics/index')
      .then(response => {
        if (response.data.status === 'ok') {
          console.log(response.data)
          dispatch(fetchTopicsSuccess(response.data))
        } else {
          dispatch(fetchTopicsFail())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchTopicsFail())
      })
  }
}

export function createArticle (data) {
  return dispatch => {
    dispatch(createArticleRequest())
    api
      .post('/article/store', data)
      .then(response => {
        if (response.data.status === 'ok') {
          dispatch(createArticleSuccess(response.data))
          dispatch(push('/article/list'))
        } else {
          dispatch(createArticleFail())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(createArticleFail())
      })
  }
}

export function deleteArticle (articles, article_id) {
  return dispatch => {
    try {

      let newArticles = articles.slice()
      let delArticleIndex = articles.findIndex(article => article.id === article_id)

      newArticles.splice(delArticleIndex, 1)

      api
        .get('article/delete/'+article_id)
        .then(response => {
          if (response.data.status === 'ok') {
            dispatch(deleteArticleSuccess(newArticles))
          } else {
            deleteArticleFail()
          }
        })
        .catch(error => {
          console.log(error)
          dispatch(deleteArticleFail())
        })

    } catch (err) {
      dispatch(deleteArticleFail())
    }
  }
}

export function fetchArticle (article_id) {
  return dispatch => {
    dispatch(fetchArticleRequest())
    api
      .get('/article/'+article_id)
      .then(response => {
        if (response.data.status === 'ok') {
          dispatch(fetchArticleSuccess(response.data))
        } else {
          dispatch(fetchArticleFail())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchArticleFail())
      })
  }
}

export function updateArticle (data) {
  return dispatch => {
    dispatch(updateArticleRequest())
    api
      .post('/article/update', data)
      .then(response => {
        if (response.data.status === 'ok') {
          dispatch(updateArticleSuccess(response.data))
          dispatch(fetchArticle(data.article_id))
        } else {
          dispatch(updateArticleFail())
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(updateArticleFail())
      })
  }
}

/**
 * Reducer
 */
const initialState = {
  isFetching: false,
  articles: null,
  topics: null,
  tags: null,
  serverAlert: {
    type: null,
    msg: null,
    display: false
  }
}

export default function articleReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        articles: action.payload.articles
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        articles: action.payload.articles
      }
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        topics: action.payload.topics
      }
    case FETCH_TOPICS_FAIL:
      return {
        ...state,
        topics: action.payload.topics
      }
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload.tags
      }
    case FETCH_TAGS_FAIL:
      return {
        ...state,
        tags: action.payload.tags
      }
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: action.payload.articles
      }
    case DELETE_ARTICLE_FAIL:
      return {
        ...state,
        articles: action.payload.articles
      }
    case FETCH_ARTICLE_REQUEST:
      return {
        ...state,
        isFetching: action.payload.isFetching
      }
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload.article,
        isFetching: action.payload.isFetching
      }
    case FETCH_ARTICLE_FAIL:
      return {
        ...state,
        isFetching: false,
        article: action.payload.article
      }
    default:
      return state
  }
}