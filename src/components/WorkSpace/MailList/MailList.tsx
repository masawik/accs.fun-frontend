import React, {Dispatch, useEffect} from 'react'
import {connect} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {TMail} from "../../../redux/api";
import {getMails} from "../../../redux/mail/mailActions";
import {Link} from "react-router-dom";
import cn from "classnames";
import styles from './MailList.module.css'


type TMailListProps = {
  isFetching: boolean,
  mails: TMail[] | null,
  onLoadMails: () => void
}

function addZero(i: number): string {
  const str = i + ''
  return str.length === 1 ? '0' + str : str
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())} ${addZero(date.getDay())}-${addZero(date.getMonth() + 1)}-${addZero(date.getFullYear())}`
}

const Plug: React.FC<{ text: string }> = ({text}) => (
  <span className="list-group-item list-group-item-action d-flex justify-content-center"><span
    className='text-muted'>{text}</span></span>)

const MailList: React.FC<TMailListProps> = ({mails, isFetching, onLoadMails}) => {

  useEffect(() => {
    onLoadMails()
  }, [])

  const $mails = mails?.map((i) => {
    const dateString = formatDate(i.date)
    return (
      <li className={styles.mailItem}>
        <Link
          to={`/dashboard/mail/${i.uid}`}
          key={i.uid}
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


const mapStateToProps = (state: TRootState) => ({
  isFetching: state.mail.isFetching,
  mails: state.mail.mails
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoadMails: () => dispatch(getMails())
})


export default connect(mapStateToProps, mapDispatchToProps)(MailList)