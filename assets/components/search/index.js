import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import Fuse from 'fuse.js'
import Results from './results'

const API = 'http://mfpstaging3.wpengine.com/wp-json/wp/v2/'

const opts = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title.rendered"
  ]
}

const Loading = styled.div`
  background-color: #0070bf;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
`

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allResults: [],
      allVideoResults: [],
      videoResults: [],
      results: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(e) {
    e.preventDefault()
    document.getElementById('searchContainer').classList.add('loading')
    const value = e.target.value

    this.setState({ value })

    let fuse = new Fuse(this.state.allResults, opts)
    let fuseVideo = new Fuse(this.state.allVideoResults, opts)

    const results = fuse.search(value)
    const videoResults = fuseVideo.search(value)
    this.setState({ results, videoResults })
    document.getElementById('searchContainer').classList.remove('loading')
  }

  async componentWillMount() {
    const allResults = await this.fetchPosts(`posts?per_page=100`)
    const allVideoResults = await this.fetchPosts(`video_hub?per_page=100`)
    this.setState({ allResults, allVideoResults })
  }

  async fetchPosts(query) {
    const url = `${API+query}&_embed`
    return await fetch(url).then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error('Failed to load'));
      }
    }).then(response => {
      return response.json()
    }).then(results => {
      return results
    })
  }

  render() {
    return (
      <div id="searchContainer">
        <form
          role="search"
          method="get"
          id="searchform"
          className="searchform"
          action='/'
        >
          <div>
            <input
              type="text"
              value={this.state.value}
              placeholder="Type search here ..."
              name="s"
              id="s"
              autoComplete="off"
              onChange={this.handleChange}
            />
            <button
              type="submit"
              id="searchsubmit"
            >
              <i className="fa fa-angle-right"></i>
            </button>
          </div>
        </form>

        <Results
          name="Video Hub"
          results={this.state.videoResults.slice(0, 3)}
        />
        <Results
          name="Posts"
          results={this.state.results.slice(0, 3)}
        />

        <Loading className="loader">
          <img src={loadingImg} />
        </Loading>
      </div>
    )
  }
}

const $search = document.getElementById('SearchNode')
if ($search) {
  render(<Search />, $search)
}
