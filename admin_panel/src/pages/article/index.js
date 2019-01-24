import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {isAdmin} from '../components/UserIsAuthenticated'
import ArticleList from './article_list'
import ArticleCreate from './article_create'
import ArticleEdit from './article_edit'

const Article = ({match}) => {
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/list`} component={ArticleList} />
        <Route path={`${match.path}/edit/:id`} component={ArticleEdit} />
        <Route path={`${match.path}/create`} component={ArticleCreate} />
        <Route component={() => <div>You lost?</div>} />
      </Switch>
    </div>
  )
}

export default isAdmin(Article)