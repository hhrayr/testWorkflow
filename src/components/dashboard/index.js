import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadWorkers, runWorkers } from '../../redux/workflow/actions';
import WorkerItem from './workerItem';
import './dashboard.scss';

class Dashboard extends React.Component {
  static propTypes = {
    loadWorkers: PropTypes.func.isRequired,
    runWorkers: PropTypes.func.isRequired,
    workers: PropTypes.array,
  }

  static defaultProps = {
    workers: null,
  }

  constructor(props) {
    super(props);

    this.runWorkers = this.runWorkers.bind(this);
    this.toggleIdleWorkersDisplay = this.toggleIdleWorkersDisplay.bind(this);
  }

  state = {
    hideIdleWorkers: false,
  }

  componentDidMount() {
    this.props.loadWorkers();
  }

  runWorkers() {
    this.props.runWorkers();
  }

  toggleIdleWorkersDisplay() {
    this.setState({ hideIdleWorkers: !this.state.hideIdleWorkers });
  }

  renderItems() {
    if (this.props.workers) {
      return this.props.workers.map((w) => {
        if (!this.state.hideIdleWorkers || w.status) {
          return <WorkerItem key={w.id} worker={w} />
        }
        return null;
      });
    }
    return null;
  }

  renderToggleButton() {
    if (this.props.workers &&
      this.props.workers.filter(w => w.status).length > 0) {
      return (
        <button
          className="btn"
          onClick={this.toggleIdleWorkersDisplay}
        >
          {this.state.hideIdleWorkers ? 'Show idle workers' : 'Hide idle workers'}
        </button>
      )
    }
  }

  render() {
    return (
      <section>
        <h1>Dashboard</h1>
        <div className="dashboard">
          <div className="workers">
            {this.renderItems()}
          </div>
          <div className="options">
            <button
              className="btn"
              onClick={this.runWorkers}
            >
              Run Workers
            </button>
            {this.renderToggleButton()}
          </div>
        </div>
      </section>
    );
  }
}

export default connect(
  (state) => {
    return {
      workers: state.workflow.workers,
    };
  },
  {
    loadWorkers,
    runWorkers,
  }
)(Dashboard);
