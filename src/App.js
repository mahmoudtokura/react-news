import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap'
import Search from './components/Search';
import Button from './components/Button';
import { DEFAULT_QUERY, DEFAULT_PAGE,
          PATH_BASE, PATH_SEARCH, 
          PARAM_SEARCH, PARAM_PAGE } from './commons/index';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;
console.log(url)


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: null,
      searchTerm: DEFAULT_QUERY,
      isLoading: false
      
    }
  }

  setTopStories = (result) => {
    this.setState({ news: result, isLoading: false})
  }

  featchTopStories = (searchTerm, page) => {

    this.setState({ isLoading: true })
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then((response) => response.json())
    .then((result) => this.setTopStories(result))
    .catch((e) => e);
  }

  componentDidMount(){
    this.featchTopStories(this.state.searchTerm, DEFAULT_PAGE)
  }

  onSubmit = (event) => {
    this.featchTopStories(this.state.searchTerm, DEFAULT_PAGE)
    event.preventDefault();
    
  }

  removeItem = (id) => {
    let isNotId = (item) => {
      return item.objectID !== id;
      
    }

    const updateList = this.state.news.hits.filter(isNotId);

    this.setState({news:{ ...this.state.news, hits: updateList}})
  }
  

  searchValue = (event) => {
    this.setState({ searchTerm: event.target.value})
  }

  render() {

    if(!this.state.news){
      return null
    }

    const page = (this.state.news && this.state.news.page) || 0;

    return (
      <div>
        <Grid fluid>
          <Row>
            <div className="jumbotron text-center">
              <Search 
                searchTerm={this.state.searchTerm} 
                searchValue={this.searchValue}
                onSubmit={this.onSubmit}
                > 
                React News App 
              </Search>
            </div>
          </Row>
        </Grid>

        <Grid>
          {
            this.state.isLoading ? <Loading/> :
            <Row>
              {
                this.state.news ?
                <Table 
                news={this.state.news.hits} 
                searchTerm={this.state.searchTerm} 
                removeItem={this.removeItem}
                /> : null
              }
              <div className="text-center alert">
                <Button 
                  onClick={ () => this.featchTopStories(this.state.searchTerm, page + 1)}>
                  Load more
                </Button>
              </div>
            </Row>
          }
          
        </Grid>
      </div>
    );
  }
}

class Table extends Component {
  render() {
    const { news, removeItem } = this.props;
    return (
      <div className="col-sm-10 col-sm-offset-1">
        {
          news.map((item, i) => {
            return (
              <div key={i}>
                <h1>
                  <a href="http://">{item.title}</a> by: {item.author}
                </h1>

                <h4>
                  Comments: {item.num_comments} | Points: {item.points}
                  
                  <Button
                    className="btn btn-danger btn-xs"
                    removeItem={ () => removeItem(item.objectID) }>
                    Remove
                  </Button>
                </h4>
                
                <hr/>
              </div>
              )
        })
        }
      </div>
    )
  }
}

const Loading = () => {
  return(
    <div className="text-center">Loading...</div>
  )
}


export default App;
