import { connect } from 'react-redux'
import { fetchZenCategory } from '../modules/zenNew'
import { updatePageTitle } from '../../../store/globalStore'
import ZenNew from '../components/ZenNew'

const mapActionCreators = {
  fetchZenCategory,
  updatePageTitle
}

const mapStateToProps = state => ({
  ...state.global,
  zen: state.zenNew
})

export default connect(mapStateToProps, mapActionCreators)(ZenNew)
