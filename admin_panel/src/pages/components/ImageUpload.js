import React from 'react'
import { Upload, Icon, message } from 'antd'
import api_config from '../../config/api_config'

class ImageUpload extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }


  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));

      this.props.onUpload(info.file.response.result.filename)

    }
  }

  onProgress = ({percent}, file) => {
    console.log('onProgress', `${percent}%`, file.name);
  }

  render () {

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl

    return (
      <Upload
        name="article_image"
        listType="picture-card"
        className="article-uploader"
        showUploadList={false}
        action= {api_config.baseUrl + "article/image_upload"}
        headers={{
          Authorization: 'Bearer ' + this.props.token,
        }}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img className={'article-upload-img'} src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}

export default ImageUpload