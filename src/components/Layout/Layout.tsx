import React from 'react'
import {TRootState} from "../../redux/rootReducer";
import {connect} from "react-redux";
import LoadingWrapper from "./LoadingWrapper/LoadingWrapper";

type TLayoutProps = {
  children: any,
  isFetching: boolean
}
//todo добавить алерты
const Layout: React.FC<TLayoutProps> = ({children, isFetching}) => {
  return (
    <div>
      {
        isFetching
          ? <LoadingWrapper/>
          : children
      }
    </div>
  )
}

const mapStateToProps = (state: TRootState) => ({
  isFetching: state.init.isFetching
})

export default connect(mapStateToProps)(Layout)