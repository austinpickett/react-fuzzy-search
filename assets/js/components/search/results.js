import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import Article from './article'

const loadingImg = 'http://1y2u3hx8yml32svgcf0087imj.wpengine.netdna-cdn.com/wp-content/themes/under-armour/assets/images/site-mfp/load-more-posts.gif'

const List = styled.div`
  z-index: 9999;
  background-color: #FFF;

  ul {
    overflow-y: auto;
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 250px;
  }
`

const Header = styled.div`
  background-color: #eee;
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  font-family: "Armour Bold", helvetica, sans-serif;
`

export default class Results extends Component {
  constructor(props) {
    super(props)
  }

  renderResult() {
    if (this.props.results.length !== 0) {
      return (
        <div>
          <Header>{this.props.name}</Header>
          <ul>
            {(this.props.results || []).map(x => {
              return <Article article={x} key={x.id}/>
            })}
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <List>
        {this.renderResult()}
      </List>
    )
  }
}
