import { connect } from 'react-redux'
import { fetchZenView } from '../modules/zenView'

import { updatePageTitle } from '../../../store/globalStore'
import ZenView from '../components/ZenView'

const mapActionCreators = {
  fetchZenView,
  updatePageTitle
}

const mapStateToProps = state => ({
  note: state.note
})

export default connect(mapStateToProps, mapActionCreators)(ZenView)
