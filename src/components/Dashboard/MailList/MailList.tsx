import React from 'react'
import {useSelector} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
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

const MailList: React.FC = () => {
  const isFetching = useSelector((state: TRootState) => state.mail.isFetching)
  const mails = useSelector((state: TRootState) => state.mail.mails)

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
    ? <li className={styles.mailItem} style={{display: 'flex', justifyContent: 'center'}}>
          <div className={styles.from}>No Mails</div>
      </li>
    : null

  return (
    <ul className={cn('plate-light', styles.container)}>
      {$plug}
      {$mails}
    </ul>
  )
}

export default MailList