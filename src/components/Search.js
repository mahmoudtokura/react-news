import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap';

class Search extends Component {
  render() {
      const { searchTerm, searchValue, onSubmit, children } = this.props
    return (
      <div>
        <form onSubmit={onSubmit}>
            <FormGroup>
            <h1 style={{ fontWeight: 'bold'}}>{children}</h1>
            <hr style={{ border: '2px solid black', width: '100px' }}/>
            <div className="input-group">
                <input 
                    className="form-control width100"
                    type="text"
                    onChange={ searchValue }
                    value={ searchTerm}
                />

                <span className="input-group-btn">
                    <button
                    className="btn btn-primary"
                    type="submit"
                    >
                    Search
                    </button>
                </span>
            </div>
            </FormGroup>
        </form>
      </div>
    )
  }
}

export default Search;
