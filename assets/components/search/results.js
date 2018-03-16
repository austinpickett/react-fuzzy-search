import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import Article from './article'

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

export default class Results extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List>
        <ul>
          {(this.props.results || []).map(x => {
            return <Article article={x} key={x.id}/>
          })}
        </ul>
      </List>
    )
  }
}
