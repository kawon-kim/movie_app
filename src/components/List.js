import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { useSwipeable } from 'react-swipeable';
import './List.css';
import deleteIcon from '../images/icon_delete_btn.svg';

function List({
  id,
  SH_NO,
  STATS_CD,
  MERC_NM,
  SH_STATUS_CD,
  SH_STATUS_NM,
  TOTAL_AMT,
  CURR_CD,
  USE_DATE,
}) {
  const handler = useSwipeable({
    onSwipedLeft: (e) => {
      if (e.absX >= 60) {
        if (e.event.target.closest('li').classList.contains('cancel')) {
          e.event.target.closest('li').classList.add('on');
        }
      }
    },
    onSwipedRight: (e) => {
      if (e.absX >= 60) {
        e.event.target.closest('li').classList.remove('on');
      }
    },
  });
  const deleteAppr = (e) => {
    e.preventDefault();
    e.target.closest('li').remove();
  };
  return (
    <Link
      to={{
        pathname: '/complete/${id}',
        state: {
          SH_NO,
          STATS_CD,
          MERC_NM,
          SH_STATUS_CD,
          SH_STATUS_NM,
          TOTAL_AMT,
          CURR_CD,
          USE_DATE,
        },
      }}
    >
      <li
        className={SH_STATUS_CD === '1100009' ? 'list' : 'list cancel'}
        {...handler}
      >
        <div
          className={
            SH_STATUS_CD === '1100009' ? 'list_inner' : 'list_inner cancel'
          }
          id={'div_' + SH_NO + '_' + SH_STATUS_CD}
        >
          <div className="div_list">
            <span className="txt_title">{MERC_NM}</span>
            <span
              className={SH_STATUS_CD === '1100009' ? 'txt_blue' : 'txt_red'}
            >
              {SH_STATUS_NM}
            </span>
          </div>
          <div className="div_list">
            <span className="txt_price">
              <NumberFormat
                value={TOTAL_AMT}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={0}
                suffix={' ' + CURR_CD}
              />
            </span>
            <span className="txt_gray">
              {USE_DATE.slice(0, 4) +
                '.' +
                USE_DATE.slice(4, 6) +
                '.' +
                USE_DATE.slice(6)}
            </span>
          </div>
        </div>
        {SH_STATUS_CD === '1100009' ? (
          ''
        ) : (
          <button
            type="button"
            className="delete_btn"
            data-popup-open="pop2"
            onClick={deleteAppr}
          >
            <img src={deleteIcon} alt="삭제" />
          </button>
        )}
      </li>
    </Link>
  );
}

export default List;
