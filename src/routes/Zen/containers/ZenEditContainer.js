import { connect } from 'react-redux'
import { fetchZenEdit, fetchZenCategory } from '../modules/zenEdit'
import { updatePageTitle } from '../../../store/globalStore'
import ZenEdit from '../components/ZenEdit'

const mapActionCreators = {
  fetchZenEdit,
  fetchZenCategory,
  updatePageTitle
}

const mapStateToProps = state => ({
  ...state.global,
  note: state.note
})

export default connect(mapStateToProps, mapActionCreators)(ZenEdit)
