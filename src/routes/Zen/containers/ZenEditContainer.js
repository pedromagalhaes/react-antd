import { connect } from 'react-redux'
import { fetchZenEdit } from '../modules/zenEdit'

import { updatePageTitle } from '../../../store/globalStore'
import ZenEdit from '../components/ZenEdit'

const mapActionCreators = {
  fetchZenEdit,
  updatePageTitle
}

const mapStateToProps = state => ({
  note: state.note
})

export default connect(mapStateToProps, mapActionCreators)(ZenEdit)
