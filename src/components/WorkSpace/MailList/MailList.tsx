import React, {Dispatch, useEffect} from 'react'
import {connect} from "react-redux";
import {TRootState} from "../../../redux/rootReducer";
import {TMail} from "../../../redux/api";
import {mailFetch} from "../../../redux/mail/mailActions";

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
//todo переделать отображение загрузки писем на алерт
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
      <a
        key={i.uid}
        className="list-group-item list-group-item-action d-flex justify-content-between"
        style={{cursor: 'pointer'}}
      >
        <span className='fw-bold d-inline-block'>{i.from}</span>
        <span className='text-muted'>{i.subject}</span>
        <span>{dateString}</span>
      </a>
    )
  })

  const $plug = isFetching
                ? <Plug text='Loading...'/>
                : $mails
                  ? null
                  : <Plug text='No mails'/>

  return (
    <div>
      <ul className="list-group">
        {$plug}
        {$mails}
      </ul>
    </div>
  )
}


const mapStateToProps = (state: TRootState) => ({
  isFetching: state.mail.isFetching,
  mails: state.mail.mails
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoadMails: () => dispatch(mailFetch())
})


export default connect(mapStateToProps, mapDispatchToProps)(MailList)