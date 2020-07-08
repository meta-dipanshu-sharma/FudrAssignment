import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createTask, deleteTask } from '../redux/task/taskAction'
import { Helmet } from 'react-helmet'
import NewTask from '../components/NewTask'
import TaskTable from '../components/TaskTable'
import './style.scss'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openNewTaskAdder: false
    }
  }

  getCurrentTimestamp = () => {
    const [, month, day, year, time] = new Date().toString().split(' ')
    const [hour, min] = time.toString().split(':')
    return `${day} ${month} ${year}, ${hour}:${min} ${hour > 12 ? 'pm' : 'am'}`
  }

  handleNewTaskAdd = (taskDescription, taskOwner) => {
    const currentTimestamp = this.getCurrentTimestamp()

    const task = {
      taskDescription,
      taskOwner,
      timestamp: currentTimestamp
    }

    this.props.createTask(task)
    this.toggleNewTaskModal()
  }

  handleTaskDelete = (task) => {
    this.props.deleteTask(task)
  }

  toggleNewTaskModal = () => {
    this.setState({ openNewTaskAdder: !this.state.openNewTaskAdder })
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A Boilerplate application homepage" />
        </Helmet>

        <div className="headingContainer">
          <h2 className="taskList">Task List</h2>
          <Button
            className="newTask"
            onClick={this.toggleNewTaskModal}
            size="sm"
            variant="light"
          >
            New Task
          </Button>
        </div>

        <NewTask
          handleNewTaskAdd={this.handleNewTaskAdd}
          openNewTask={this.state.openNewTaskAdder}
          toggleNewTaskModal={this.toggleNewTaskModal}
        />

        <div className="dataContainer">
          <TaskTable
            data={this.props.tasks}
            handleTaskDelete={this.handleTaskDelete}
          />
        </div>

      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: (task) => dispatch(createTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage)
