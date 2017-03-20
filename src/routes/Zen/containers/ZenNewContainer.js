import { connect } from 'react-redux'

import { updatePageTitle, toggleSnackbar, resetSnackbar } from '../../../store/globalStore'
import ZenNew from '../components/ZenNew'

const mapActionCreators = {
  updatePageTitle,
  toggleSnackbar,
  resetSnackbar
}

const mapStateToProps = state => ({ ...state.global })

export default connect(mapStateToProps, mapActionCreators)(ZenNew)
