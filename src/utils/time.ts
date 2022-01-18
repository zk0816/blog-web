/**
 * 2个时间差函数
 */
import moment from 'moment';

const diffTime = (start?:number,end?:number) => {
  const m1 = moment(start);
  const m2 = moment(end);
  let time = m2.diff(m1,'minutes');
  if (time < 60) return `${time}分`;
  if ( 60 < time && time < 60 * 24) return `${m2.diff(m1,'hours')}时`;
  if (60 * 24 < time && time < 60 * 24 * 30 ) return `${m2.diff(m1,'days')}天`;
  if ( 60 * 24 * 30 < time && time <  60 * 24 * 30 * 12) return `${m2.diff(m1,'months')}月`;
  if ( 60 * 24 * 30 * 12 < time ) return `${m2.diff(m1,'years')}年`;
}

export default diffTime;