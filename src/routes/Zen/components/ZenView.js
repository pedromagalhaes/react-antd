import React from 'react'

class ZenView extends React.Component {

  static propTypes = {
    updatePageTitle: React.PropTypes.func.isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired,
    params: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
    fetchZenView: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchZenView(this.props.params.id)
  }

  componentDidMount() {
    this.props.updatePageTitle('View Zen')
  }

  handleGoBack = () => {
    this.props.router.push('/zen')
  }

  render() {
    const { note } = this.props.note

    if (!note) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {note.content}
      </div>
    )
  }
}

export default ZenView
