import React from 'react'
import { Row, Col, Form, Input, Select, Checkbox, Divider, Button, message } from 'antd'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import ArticlesContext from '../../ArticlesContext'
import ImageUpload from '../../../components/ImageUpload'

const FormItem = Form.Item
//const { TextArea } = Input


class ArticleCreateForm extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      article_img: null,
      body: '',
      published: false,
      featured: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        let form_data = {
          title: this.props.form.getFieldValue('title'),
          tag_line: this.props.form.getFieldValue('tag_line'),
          body: this.state.body,
          article_img: this.state.article_img,
          topic: this.props.form.getFieldValue('topic'),
          published: this.state.published,
          tags: this.props.form.getFieldValue('tags'),
          featured: this.state.featured
        }

        console.log(form_data)
        this.props.articles.createArticle(form_data)
        message.success('Article saved');
      }
    });
  }

  componentDidMount () {
    this.props.articles.fetchTopics()
    this.props.articles.fetchTags()
  }

  onFileUpload = (path) => {
    this.setState({article_img: path})
  }

  bodyChange = (value) => {
    this.setState({ body: value })
  }

  onPublishChange = (e) => {
    this.setState({published: e.target.checked})
  }

  onFeatureChange = (e) => {
    this.setState({featured: e.target.checked})
  }

  render () {

    const { getFieldDecorator } = this.props.form
    const { topics, tags } = this.props.articles

    if(!topics || !tags) {
      return <div>Loading</div>
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={17}>
            <FormItem label={"Title"}>
              {getFieldDecorator('title',{
                rules: [{required: true, message: "Article Title..."}]
              })(
                <Input name={"article_title"} placeholder={"Title..."}  />
              )}
            </FormItem>
            <FormItem label={"Tag Line"}>
              {getFieldDecorator('tag_line',{
                rules: [{required: true, message: "Tag Line..."}]
              })(
                <Input name={"tag_line"} placeholder={"Tag Line..."}  />
              )}
            </FormItem>
            <Divider />
            <ReactQuill
              className="quill-editor"
              defaultValue={this.state.text}
              onChange={this.bodyChange} />
          </Col>
          <Col span={7}>
            <FormItem label={"Topic"}>
              {getFieldDecorator('topic',{
                rules: [{required: true, message: "Select a topic..."}]
              })(
                <Select name={"attribute_type"} onChange={this.handleAttributeChange}>
                  {topics.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <Divider />
            <ImageUpload token={this.props.articles.token} onUpload={this.onFileUpload}/>
            <Divider />
            <FormItem label={"Tags"}>
              {getFieldDecorator('tags',{
                rules: [{required: true, message: "apply some tags to this article"}]
              })(
                <Select
                  name={"tags"}
                  mode="tags"
                  onChange={this.handleAttributeChange}
                  tokenSeparators={[',']}
                >
                  {tags.map(item => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <Divider />
            <Checkbox onChange={this.onPublishChange}>Publish</Checkbox>
            <Checkbox onChange={this.onFeatureChange}>Featured</Checkbox>
            <Divider />
            <Button type="primary" htmlType="submit" className={"article-save-button"}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedForm = Form.create()(ArticleCreateForm);

export default React.forwardRef((props, ref) => (
  <ArticlesContext.Consumer>
    {articles => <WrappedForm {...props} articles={articles} ref={ref} />}
  </ArticlesContext.Consumer>
))