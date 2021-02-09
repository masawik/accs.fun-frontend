import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {getMails} from "../../../redux/mail/mailActions";
import {Link} from "react-router-dom";
import cn from "classnames";
import styles from './MailList.module.css'

function addZero(i: number): string {
  const str = i + ''
  return str.length === 1 ? '0' + str : str
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())} ${addZero(date.getDay())}-${addZero(date.getMonth() + 1)}-${addZero(date.getFullYear())}`
}

//todo стилизовать заглушку
const Plug: React.FC<{ text: string }> = ({text}) => (
  <span className="list-group-item list-group-item-action d-flex justify-content-center"><span
    className='text-muted'>{text}</span></span>)

const MailList: React.FC = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector((state: TRootState) => state.mail.isFetching)
  const mails = useSelector((state: TRootState) => state.mail.mails)

  useEffect(() => {
    dispatch(getMails())
  }, [dispatch])

  const $mails = mails?.map((i) => {
    const dateString = formatDate(i.date)
    return (
      <li key={i.uid} className={styles.mailItem}>
        <Link
          to={`/dashboard/mail/${i.uid}`}
        >
          <div className={styles.from}>{i.from}</div>
          <div className={styles.subject}>{i.subject}</div>
          <div className={styles.date}>{dateString}</div>
        </Link>
      </li>
    )
  })

  const $plug = !$mails && !isFetching
    ? <Plug text='No mails'/>
    : null

  return (
    <ul className={cn('plate-light', styles.container)}>
      {$plug}
      {$mails}
    </ul>
  )
}

export default MailList