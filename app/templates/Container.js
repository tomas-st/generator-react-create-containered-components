import React, {PropTypes} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
<%= name %>} from 'components'

const {func, int, string} = PropTypes
// import * as itemActions from 'redux/modules/items'

const <%= name %>Container = React.createClass({
  propTypes: {
  },
  componentDidMount () {
  },
  render () {
    return (
        <<%= name %> />
    )
  }
})

// function mapStateToProps ({items}) {
//   return {
//     items: items,
//   }
// }

export default connect(
  // mapStateToProps,
  // (dispatch) => bindActionCreators(itemActions, dispatch)
)(<%= name %>)
