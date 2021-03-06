import React from 'react';
import {connect} from 'react-redux';
import ResortForm from '../resort/resort-form';
import * as resortActions from '../../action/resort-action.js';

class Dashboard extends React.Component{

  componentDidMount(){
    this.props.resortFetchAll();
  }

  render(){
    console.log('dashprops', this.props);
    return(
      <div className='dashboard'>
      yo from Dash
        <ResortForm
          buttonText='Create Resort'
          onComplete={this.props.resortCreate}
        />
        <div className='resort-list'>
          {this.props.resorts.map(resort => {
            return <div key={resort._id} className='resort'>
              <h3>{resort.name}</h3>
              <h6>{resort._id}</h6>
              <button onClick={() => this.props.resortDestroy(resort)} type="submit">Delete Resort</button>
              <ResortForm
                buttonText='Update Resort'
                onComplete={this.props.resortUpdate}
                resort={resort}
              />
            </div>;
          })}

        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({resorts: state.resorts});

let mapDispatchToProps = (dispatch) => ({
  resortCreate: (resort) => dispatch(resortActions.resortCreateRequest(resort)),
  resortUpdate: (resort) => dispatch(resortActions.resortUpdateRequest(resort)),
  resortDestroy: (resort) => dispatch(resortActions.resortDestroyRequest(resort)),
  resortFetchAll: () => dispatch(resortActions.resortFetchAllRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
