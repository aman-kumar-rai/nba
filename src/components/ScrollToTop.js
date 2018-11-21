const React = require('react');
const {withRouter} = require('react-router-dom');

class ScrollToTop extends React.Component{

  componentDidUpdate(previousProps){
    if(this.props.location != previousProps.location){
      window.scrollTo(0, 0);
    }
  }

  render(){
    return this.props.children;
  }

}

module.exports = withRouter(ScrollToTop);