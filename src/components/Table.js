import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    const { news, searchTerm, removeItem } = this.props;
    return (
      <div>
        {
          news.filter(isSearched(searchTerm)).map((item, i) => {
            return (
              <div key={i}>
                <h1><a href="http://">{item.title}</a> by: {item.author}</h1> 
                <h4>Number of Comments: {item.num_comments} | Points: {item.points}</h4>
                <button onClick={() => removeItem(item.objectID)} type="button">Remove this item</button>
                <hr/>
              </div>
              )
        })
        }
      </div>
    )
  }
}
