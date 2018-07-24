import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.scss';

class WorkerItem extends React.Component {
  static propTypes = {
    worker: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      param: PropTypes.any,
      true_id: PropTypes.string,
      false_id: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
  }

  state = {
    expanded: true,
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderItemContent() {
    //if (this.state.expanded) {
      return (
        <div className="content">
          <div className="prop long">
            <label>Rule Body</label>
            <div className="code value">
              <p className="dcl">function(obj) {'{'}</p>
              <p>{this.props.worker.body}</p>
              <p className="dcl">{'}'}</p>
            </div>
          </div>
          <div className="prop long">
            <label>Rule Param</label>
            <div className="value">
              {this.props.worker.param}
            </div>
          </div>
          <div className="prop">
            <label>Next rule if passed</label>
            <div className="value">
              {this.props.worker.true_id}
            </div>
          </div>
          <div className="prop">
            <label>Next rule if failed</label>
            <div className="value">
              {this.props.worker.false_id}
            </div>
          </div>
        </div>
      );
    //}
    //return null;
  }

  render() {
    const styles = ['worker-item'];
    if (this.state.expanded) {
      styles.push('expanded');
    }
    if (this.props.worker.status === 'passed' ||
      this.props.worker.status === 'failed') {
      styles.push(this.props.worker.status);
    }
    return (
      <div className={styles.join(' ')}>
        <h2 onClick={() => { this.toggleExpand(); }}>
          <span>{this.props.worker.id}</span>
          {this.props.worker.label}
        </h2>
        {this.renderItemContent()}
      </div>
    );
  }
}

export default WorkerItem;