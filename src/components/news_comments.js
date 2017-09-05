
import React, {Component, PropTypes} from 'react'
import {Form, Card, Input, Button, notification} from 'antd'
import axios from 'axios'
const FormItem = Form.Item
class NewsComments extends Component {
  static propTypes = {
    uniquekey: PropTypes.string.isRequired
  }
  state = {
    comments: []
  }
  componentDidMount () {
    const {uniquekey} = this.props
    this.showComments(uniquekey)
  }
  componentWillReceiveProps (newProps) {
    this.showComments(newProps.uniquekey)
  }
  showComments(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const comments = response.data
        this.setState({comments})
      })
  }

  handleSubmit = () => {
    const userId = localStorage.getItem('userId')
    if(!userId) {
      alert('请先登陆')
      return
    }
    const {uniquekey} = this.props
    const content = this.props.form.getFieldValue('content')
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
    axios.get(url)
      .then(response => {
        this.componentDidMount()
        notification.success({
          message: '提交成功'
        })
        this.props.form.resetFields()
      })
  }

  handleClick = () => {
    const userId = localStorage.getItem('userId')
    if(!userId) {
      alert('请先登陆')
      return
    }
    const {uniquekey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        notification.success({
          message: '收藏成功'
        })
      })
  }

  render () {
    const commentList = this.state.comments.map((comment, index) => (
      <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    const {getFieldDecorator} = this.props.form
    return (
      <div style={{padding:'10px'}}>
        {commentList}
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='您的评论'>
            {getFieldDecorator('content')(
              <Input type='textarea' placeholder="请输入评论内容" />
            )}
          </FormItem>
          <Button type='primary' htmlType='submit'>提交评论</Button>
          <Button type='primary' onClick={this.handleClick}>收藏文章</Button>
        </Form>
      </div>
    )
  }
}
export default Form.create()(NewsComments)