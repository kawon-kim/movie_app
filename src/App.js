import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Detail from './components/Detail';
import Navigation from './components/Navigation';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  state = {
    visible: false,
  };
  showMenus = (showMenus) => {
    this.child.current.showMenus();
  };
  componentDidMount() {}
  render() {
    return (
      <HashRouter>
        <header className="mainheader">
          <a className="menu_btn" onClick={this.showMenus}>
            <span className="blind">메뉴</span>
          </a>
          <h1 id="headerTitle">요청내역</h1>
        </header>
        <Navigation ref={this.child} />
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/complete/:id" component={Detail} />
      </HashRouter>
    );
  }
}

export default App;
