import React from 'react'
import { Table, Divider, Popconfirm, Button, message } from "antd";
import ArticlesContext from '../../ArticlesContext'
import { Link } from 'react-router-dom'

class ArticleListingTable extends React.PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      columns: [
        {
          title: "",
          dataIndex: "thumbnail_url",
          key: "thumbnailUrl",
          width: 10,
          render: (text, record) => {
            return <img src={record.feature_img_small_url} alt={record.title} height={32}/>
          }
        },
        {title: 'ID', key: 'id', dataIndex: 'id'},
        {title: 'Date', key: 'date', dataIndex: 'created_at'},
        {title: 'Title', key: 'title', dataIndex: 'title'},
        {title: 'Topic', key: 'Topic', dataIndex: 'topic.title'},
        {
          title: 'operation',
          dataIndex: 'operation',
          width: 200,
          align: 'right',
          render: (text, record) => {
            return (
              <React.Fragment>
                <Button.Group>
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                    <Button>Delete</Button>
                  </Popconfirm>
                  <Button><Link to={"/article/edit/"+record.id}>Edit</Link></Button>
                </Button.Group>
              </React.Fragment>
            )
          }
        }
      ]
    }
  }

  handleDelete = (id) => {
    this.props.articles.deleteArticle(this.props.articles.articles, id)
    message.warning('Article ID: ' + id + ' deleted')
  }

  componentDidMount () {
    console.log('listing table')
  }

  render () {
    return (
      <React.Fragment>
        <h3>Articles</h3>
        <Divider />
        <Link to={"/article/create"}>
          Create
        </Link>
        <Divider />
        <Table bordered loading={this.props.articles.isFetching} rowKey={record => record.id} columns={this.state.columns} dataSource={this.props.articles.articles} />
      </React.Fragment>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <ArticlesContext.Consumer>
    {articles => <ArticleListingTable {...props} articles={articles} ref={ref} />}
  </ArticlesContext.Consumer>
))