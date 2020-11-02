import React, { Fragment } from 'react';
import axios from 'axios';
import List from '../components/List';
import '../components/List.css';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    out_data: [],
  };
  getList = async () => {
    const {
      data: { out_data },
    } = await axios.get('/data/list.json');
    this.setState({ out_data, isLoading: false });
  };
  componentDidMount() {
    this.getList();

    // fetch('http://localhost:3000/movie_app/data/list.json')
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     console.log('딩동');
    //     this.setState({ out_data: resp.out_data });
    //   });
  }
  render() {
    const { isLoading, out_data } = this.state;
    return (
      <Fragment>
        <section className="container" id="list_container">
          <div className="contents">
            {isLoading ? (
              <div className="loader">
                <span className="loader__text">Loading...</span>
              </div>
            ) : (
              <ul className="process_list type2">
                {out_data.map((slip) => (
                  <List
                    key={slip.SH_NO}
                    id={slip.SH_NO}
                    SH_NO={slip.SH_NO}
                    SH_STATUS_CD={slip.SH_STATUS_CD}
                    SH_STATUS_NM={slip.SH_STATUS_NM}
                    MERC_NM={slip.MERC_NM}
                    CURR_CD={slip.CURR_CD}
                    TOTAL_AMT={slip.TOTAL_AMT}
                    USE_DATE={slip.USE_DATE}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Home;
