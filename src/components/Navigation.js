import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Navigation.css';
import closeImg from '../images/icon_menu_close.svg';
import homeImg from '../images/icon_profile_home.svg';
import menu02 from '../images/icon_menu_02.svg';

class Navigaton extends React.Component {
  state = {
    visible: false,
    menus: [],
    user: {},
  };
  showMenus = () => {
    this.setState({ visible: true });
  };
  closeMenus = () => {
    this.setState({ visible: false });
  };
  getMenus = async () => {
    const {
      data: { menus, user },
    } = await axios.get('/data/menu.json');
    this.setState({
      menus,
      user,
    });
  };
  componentDidMount() {
    this.getMenus();
  }
  render() {
    const { menus, user } = this.state;
    return (
      <div className={this.state.visible ? 'drawer_menu on' : 'drawer_menu'}>
        <a className="close_btn">
          <img src={closeImg} alt="닫기" onClick={this.closeMenus} />
        </a>
        <div className="inner_content">
          <div className="user_info">
            <div className="user_proflie">
              <i>
                <img src={homeImg} alt="홈" onClick={this.closeMenus} />
              </i>
              <span>UAS</span>
              <span className="name">
                {user.EMP_NM} {user.JOB_GRADE_NM}
              </span>
            </div>
          </div>
          <nav>
            <ul>
              {menus.map((menu) => (
                <li className="on" key={menu.MENU_CD} onClick={this.closeMenus}>
                  <Link to="/">
                    <img src={menu02} alt={menu.MENU_NM} /> {menu.MENU_NM}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navigaton;
