import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc)
dayjs.extend(timezone)

export const getCurrentTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export const getAddToCurrentTime = (
  num: number,
  unit: dayjs.ManipulateType,
) => {
  return dayjs().add(num, unit).format('YYYY-MM-DD HH:mm:ss')
}

export const isAfterCurrentTime = (time: string) => {
  // console.log('current passed time', dayjs(time).tz('Asia/Tokyo'));
  // console.log('current JST', dayjs().tz('Asia/Tokyo'));
  // console.log('is passed time after JST?', dayjs(time).tz('Asia/Tokyo').isAfter(dayjs().tz('Asia/Tokyo')));
  return dayjs(time).isAfter(dayjs())
}

export const getCurrentJST = () => {
  return dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
}