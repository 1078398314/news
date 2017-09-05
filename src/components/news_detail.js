import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, BackTop} from 'antd'
import NewsImageBlock from './news_image_block'
import NewsComments from './news_comments'
export default class NewsDetail extends Component {
  state = {
    news: {}
  }

  componentDidMount () {
    const {uniquekey} = this.props.params
    this.showNewsDetail(uniquekey)
  }
  componentWillReceiveProps (newProps) {
    this.showNewsDetail(newProps.params.uniquekey)
  }

  showNewsDetail(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data
        this.setState({news})
        document.title = news.title
      })
  }

  render () {
    const {news} = this.state
    let {type, uniquekey} = this.props.params
    if(!type) {
      type = 'top'
    }
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className='container'>
            <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
            <NewsComments uniquekey={uniquekey}></NewsComments>
          </Col>
          <Col span={6}>
            <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle="相关新闻"></NewsImageBlock>
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop />
      </div>
    )
  }
}