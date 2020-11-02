import React, { Fragment } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import './Detail.css';

class Detail extends React.Component {
  state = {
    isLoading: true,
    OUT_SLIP_CARD_USE_INFO: {},
    OUT_SLIP_BASIC_INFO: {},
    OUT_APPR_REQ_LN: [],
    OUT_SLIP_EXP_LINES_INFO: [],
  };
  getDetail = async () => {
    const {
      data: {
        OUT_SLIP_CARD_USE_INFO,
        OUT_SLIP_BASIC_INFO,
        OUT_APPR_REQ_LN,
        OUT_SLIP_EXP_LINES_INFO,
      },
    } = await axios.get('/data/detail.json');
    this.setState({
      OUT_SLIP_CARD_USE_INFO,
      OUT_SLIP_BASIC_INFO,
      OUT_APPR_REQ_LN,
      OUT_SLIP_EXP_LINES_INFO,
      isLoading: false,
    });
  };
  cancelAppr = () => {
    const { history } = this.props;
    if (window.confirm('결재요청을 취소하시겠습니까?')) {
      history.push('/?id=dkd');
    }
  };
  componentDidMount() {
    const { location, history } = this.props;
    console.log(location);
    this.getDetail();
  }
  backEvent = () => {
    const { history } = this.props;
    history.goBack();
  };
  render() {
    const { location } = this.props;
    const {
      isLoading,
      OUT_SLIP_CARD_USE_INFO,
      OUT_SLIP_BASIC_INFO,
      OUT_APPR_REQ_LN,
      OUT_SLIP_EXP_LINES_INFO,
    } = this.state;
    if (location.state === undefined) {
      return null;
    } else {
      return (
        <Fragment>
          <header className="mainheader">
            <a className="back_btn" onClick={this.backEvent}>
              <span className="blind">뒤로</span>
            </a>
            <h1>요청내역 상세조회</h1>
          </header>
          <section className="container">
            <div className="contents">
              <ul className="detail_list">
                <li>
                  <dl>
                    <dt>경비내역번호 / 유형</dt>
                    <dd>
                      <span>{location.state.SH_NO}</span> /{' '}
                      {OUT_SLIP_BASIC_INFO.SH_TYPE_NM}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>진행상태 / 요청일</dt>
                    <dd>
                      <span
                        className={
                          location.state.SH_STATUS_CD === '1100009'
                            ? 'txt_blue'
                            : 'txt_red'
                        }
                      >
                        {OUT_SLIP_BASIC_INFO.SH_STATUS_NM}
                      </span>{' '}
                      / {OUT_SLIP_BASIC_INFO.SH_APPRV_DT}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>카드번호 / 소유자</dt>
                    <dd>
                      <span>{OUT_SLIP_CARD_USE_INFO.CARD_NO_MASKED}</span> /{' '}
                      {OUT_SLIP_CARD_USE_INFO.CARD_EMP_NM}{' '}
                      {OUT_SLIP_CARD_USE_INFO.CARD_EMP_TITLE_NM}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>사용일시</dt>
                    <dd>
                      <span>
                        {location.state.USE_DATE.slice(0, 4) +
                          '.' +
                          location.state.USE_DATE.slice(4, 6) +
                          '.' +
                          location.state.USE_DATE.slice(6)}
                      </span>{' '}
                      {OUT_SLIP_CARD_USE_INFO.APPRV_TIME}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>사용장소 / 업종</dt>
                    <dd>
                      <span>{location.state.MERC_NM}</span> /{' '}
                      {OUT_SLIP_CARD_USE_INFO.MERC_BIZ_TYPE_NM}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>금액 </dt>
                    <dd>
                      <NumberFormat
                        value={location.state.TOTAL_AMT}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={0}
                      />{' '}
                      {OUT_SLIP_CARD_USE_INFO.CURR_CD}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>메모</dt>
                    <dd>
                      <span>{OUT_SLIP_BASIC_INFO.SH_TXT}</span>
                    </dd>
                  </dl>
                </li>
                <li className="bor_none">
                  <dl>
                    <dt>비용상세정보</dt>
                    <dd>
                      <ol>
                        {OUT_SLIP_EXP_LINES_INFO.map((exp, index) => (
                          <li key={index}>
                            <ul>
                              <li>
                                <dl>
                                  <dt>비용계정</dt>
                                  <dd>
                                    <span>{exp.SD_GLACCT_NM}</span>
                                  </dd>
                                </dl>
                              </li>
                              <li>
                                <dl>
                                  <dt>비용조직</dt>
                                  <dd>
                                    <span>{exp.SD_COST_OBJECT_NM}</span>
                                  </dd>
                                </dl>
                              </li>
                              <li>
                                <dl>
                                  <dt>금액 / 세액 / 세금코드</dt>
                                  <dd>
                                    <NumberFormat
                                      value={exp.EXPENSE_TOTAL_AMT}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      decimalScale={0}
                                      suffix={' ' + exp.SH_TRX_CURRENCY_CD}
                                    />{' '}
                                    /{' '}
                                    <NumberFormat
                                      value={exp.VAT_AMT}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      decimalScale={0}
                                      suffix={' ' + exp.SH_TRX_CURRENCY_CD}
                                    />{' '}
                                    / <span>{exp.SD_TAX_CD}</span>
                                  </dd>
                                </dl>
                              </li>
                              <li>
                                <dl>
                                  <dt>적요</dt>
                                  <dd>{exp.SD_TXT}</dd>
                                </dl>
                              </li>
                            </ul>
                          </li>
                        ))}
                      </ol>
                    </dd>
                  </dl>
                </li>
                <li className="bor_none">
                  <dl>
                    <dt>결재정보</dt>
                    <dd>
                      <ol>
                        {OUT_APPR_REQ_LN.map((line, index) => (
                          <li key={index}>
                            <div>
                              <strong>
                                [{line.APPR_AGR_TYPE_NM}-
                                <span
                                  className={
                                    line.APPR_RESULT === 'W' ? '' : 'on'
                                  }
                                >
                                  {line.APPR_RESULT_NM}
                                </span>
                                ]
                              </strong>
                              <span>
                                {line.EMP_NM} {line.JOB_TITLE_NM}
                              </span>
                              <i>│</i>
                              <span>{line.ORG_NM}</span>
                            </div>
                            <div>
                              <p className="info_txt">{line.APPR_COMMENT}</p>
                              <p className="date">
                                {line.APPR_DT} {line.APPR_TIME}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </dd>
                  </dl>
                </li>
              </ul>

              {location.state.SH_STATUS_CD === '1100009' ? (
                ''
              ) : (
                <footer className="content_footer">
                  <button
                    type="button"
                    className="basic_btn type2"
                    id="cancelAppr"
                    onClick={this.cancelAppr}
                  >
                    결재요청취소
                  </button>
                </footer>
              )}
            </div>
          </section>
        </Fragment>
      );
    }
  }
}

export default Detail;
