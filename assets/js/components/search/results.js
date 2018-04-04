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

  strong {
    background-color: #eee;
    text-align: center;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    font-family: "Armour Bold", helvetica, sans-serif;
    width: 100%;
    display: block;
  }
`

export default ({ results, name }) => {

  const renderResult = () => {
    if (results.length !== 0) {
      console.log(results)
      return (
        <List>
          <strong>{name}</strong>
          <ul>
            {(results || []).map(x => {
              return <Article article={x} key={x.id}/>
            })}
          </ul>
        </List>
      )
    }
  }

  return <div>{renderResult()}</div>
}
