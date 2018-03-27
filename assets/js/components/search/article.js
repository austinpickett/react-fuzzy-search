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

    div {
      color: #FFF;
    }
  }
`

const PostCover = styled.div`
    display: block;
    width: 80px !important;
    height: 80px !important;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100% !important;
      height: 100% !important;
    }
`
const PostRight = styled.div`
  padding: 0 20px;
  width: 80%;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-family: "Armour Bold", helvetica, sans-serif;
  text-transform: uppercase;
  color: #000;
  margin: 0 0 3px 0;
`

const DateWrap = styled.div`
  text-transform: uppercase;
  color: #acacac;
  font-size: 11px;
  margin: 0;
`
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class Article extends Component {
  constructor(props) {
    super(props)

    this.date = new Date(this.props.article.date)
    this.month = MONTH_NAMES[this.date.getMonth()]
    this.day = this.date.getDate()
    this.year = this.date.getFullYear()
  }

  render() {
    return(
      <li>
        <Link href={this.props.article.link}>
          <PostCover>
            <img src={this.props.article._embedded['wp:featuredmedia'][0].source_url } />
          </PostCover>
          <PostRight>
            <Title dangerouslySetInnerHTML={{ __html: this.props.article.title.rendered }} />
            <DateWrap>{this.month} {this.day}, {this.year}</DateWrap>
          </PostRight>
        </Link>
      </li>
    )
  }
}
