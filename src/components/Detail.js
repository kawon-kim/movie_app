import React from 'react';
import { Link } from 'react-router-dom';

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    console.log(location);
  }
  render() {
    const { location } = this.props;
    if (location.state === undefined) {
      return null;
    } else {
      return <span>{location.state.title}</span>;
    }
  }
}

export default Detail;
