import React, { Component } from 'react'
import Modal from '../Modal'
import PropTypes from 'prop-types'
import './style.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {
                descriptionError: false,
                ownerError: false
            },
            taskDescription: '',
            taskOwner: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.openNewTask !== this.props.openNewTask) {
            this.setState({
                taskDescription: '',
                taskOwner: '',
                errors: {
                    descriptionError: false,
                    ownerError: false
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            taskDescription: e.target.value
        })
    }

    handleCreateTask = () => {
        const { taskDescription, taskOwner } = this.state

        const error = this.validateForm(taskDescription, taskOwner)

        if (!error) {
            this.props.handleNewTaskAdd(taskDescription, taskOwner)
        }
    }

    handleSelect = (e) => {
        this.setState({
            taskOwner: e.target.value
        })
    }

    validateForm = (taskDescription, taskOwner) => {
        const errors = {
            descriptionError: !taskDescription.length,
            ownerError: !taskOwner.length
        }

        this.setState({ errors })
        return (!taskDescription.length || !taskOwner.length)
    }

    fillNewTaskForm = () => {
        const { errors } = this.state

        return (
            <form>
                <p
                    className={errors.descriptionError ? 'showErrorHeading' : ''}
                >
                    Task
                </p>

                <textarea
                    className={errors.descriptionError ? 'invalidTaskDescription' : 'validTaskDescription'}
                    cols="30"
                    onChange={this.handleChange}
                    placeholder="Enter task details"
                    required
                    rows="3"
                >
                </textarea>

                <p
                    className={errors.descriptionError ? 'showErrorMsg' : 'hideErrorMsg'}
                >
                    This field is required to proceed
                </p>

                <p className={errors.ownerError ? 'showErrorHeading' : ''} >
                    Assign to
                </p>

                <select
                    className={errors.ownerError ? 'invalidTaskOwner' : 'validTaskOwner'}
                    onClick={this.handleSelect}
                >
                    <option value="">Select...</option>
                    <option value="Arnab Sharma">Arnab Sharma</option>
                    <option value="Aayush Khandpur">Aayush Khandpur</option>
                    <option value="Ankit Saini">Ankit Saini</option>
                    <option value="Dipanshu Sharma">Dipanshu Sharma</option>
                </select>

                <p
                    className={errors.ownerError ? 'showErrorMsg' : 'hideErrorMsg'}
                >
                    This field is required to proceed
                </p>
            </form>
        )
    }

    render() {
        const modalBody = this.fillNewTaskForm()

        return (
            <Modal
                animation={false}
                confirmationText="Create"
                handleCancel={this.props.toggleNewTaskModal}
                handleConfirm={this.handleCreateTask}
                modalBody={modalBody}
                onHide={this.props.toggleNewTaskModal}
                show={this.props.openNewTask}
                size="sm"
                title="New Task"
            >
            </Modal>
        )
    }
}

index.propTypes = {
    toggleNewTaskModal: PropTypes.func.isRequired,
    openNewTask: PropTypes.bool.isRequired,
}

export default index