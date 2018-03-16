import React, { Component } from 'react'
import { render } from 'react-dom'
import Fuse from 'fuse.js'
import Results from './results'

const API = 'http://mfpstaging3.wpengine.com/wp-json/wp/v2/posts'

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

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allResults: [],
      results: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(e) {
    e.preventDefault()
    const value = e.target.value
    this.setState({ value })

    let fuse = new Fuse(this.state.allResults, opts)

    const results = fuse.search(value)
    this.setState({ results })
  }

  async componentWillMount() {
    const allResults = await this.fetchPosts(`per_page=100`)
    this.setState({ allResults })
  }

  async fetchPosts(query) {
    const url = `${API}?${query}&_embed`
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
      <div>
        <form
          role="search"
          method="get"
          id="searchform"
          className="searchform"
          action='javascript:;'
          onSubmit={this.handleChange}
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

        <Results results={this.state.results}/>
      </div>
    )
  }
}

const $search = document.getElementById('SearchNode')
if ($search) {
  render(<Search />, $search)
}
