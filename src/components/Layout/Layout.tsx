import React from 'react'
import {TRootState} from "../../redux/rootReducer";
import {useSelector} from "react-redux";
import LoadingWrapper from "./LoadingWrapper/LoadingWrapper";

type TLayoutProps = {
  children: React.ReactNode
}
//todo добавить алерты
const Layout: React.FC<TLayoutProps> = ({children}) => {
  const isFetching = useSelector((state: TRootState) => state.init.isFetching)

  return (
    <div className='container'>
      {
        isFetching
          ? <LoadingWrapper/>
          : children
      }
    </div>
  )
}

export default Layout