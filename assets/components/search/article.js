import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

const Link = styled.a`
  display: flex;
  width: 100%;
  align-items: center;

  &:hover {
    background-color: #0070bf;
    color: #FFF;
  }
`

const PostCover = styled.div`
`
const PostRight = styled.div`
  padding: 20px;
`

export default class Article extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li>
        <Link href={this.props.article.link}>
        <PostCover>
          <img
            src={this.props.article._embedded['wp:featuredmedia'][0].source_url}
            width="80" height="80" scale="0"
          />
        </PostCover>
        <PostRight>
          <span className="sf_text">{this.props.article.title.rendered}</span><br />
          <span className="sf_small">{new Date(this.props.article.date).toLocaleDateString()}</span>
        </PostRight>
        </Link>
      </li>
    )
  }
}
