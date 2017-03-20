import { connect } from 'react-redux'
import { fetchZen, deleteZen } from '../modules/zen'
import { updatePageTitle } from '../../../store/globalStore'
import Zen from '../components/Zen'

const mapActionCreators = {
  fetchZen,
  updatePageTitle,
  deleteZen
}

const mapStateToProps = state => ({
  zen: state.zen
})

export default connect(mapStateToProps, mapActionCreators)(Zen)
