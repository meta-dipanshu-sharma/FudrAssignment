import React, { Component } from 'react'
import { Button, OverlayTrigger, Popover, Table } from 'react-bootstrap'
import Modal from '../Modal'
import PropTypes from 'prop-types'
import './style.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openDeleteModal: false,
            openTaskActionMenu: false,
            toDeleteTask: {}
        }
    }

    handleDeleteTask = () => {
        this.toggleDeleteModal()
        this.props.handleTaskDelete(this.state.toDeleteTask)
    }

    handleDelete = (task) => {
        document.body.click()
        this.toggleDeleteModal()
        this.setState({ toDeleteTask: task })
    }

    toggleTaskActionMenu = () => {
        this.setState({ openTaskActionMenu: !this.state.openTaskActionMenu })
    }

    toggleDeleteModal = () => {
        this.setState({ openDeleteModal: !this.state.openDeleteModal })
    }

    addTaskActionMenu = (task, key) => {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Content>
                    <Button
                        onClick={() => document.body.click()}
                        variant="light"
                    >
                        Edit Task
                    </Button>
                    <Button
                        onClick={() => this.handleDelete(task)}
                        variant="light"
                    >
                        Delete Task
                    </Button>
                </Popover.Content>
            </Popover>
        )

        return (
            <OverlayTrigger
                key={key}
                overlay={popover}
                placement="bottom"
                rootClose
                trigger="click"
            >
                <i
                    aria-hidden="true"
                    className="fa fa-ellipsis-v"
                    onClick={this.toggleTaskActionMenu}
                >
                </i>
            </OverlayTrigger>
        )
    }

    renderTask(task, key) {
        return (
            <tr key={key} className="taskRow">
                <td>
                    <div className="dataHeader">
                        <p className="taskDescription">{task.taskDescription}</p>
                        {this.addTaskActionMenu(task, key)}
                    </div>

                    <p className="taskOwner">{task.taskOwner}</p>
                    <p className="timestamp">{task.timestamp}</p>
                </td>
            </tr>
        )
    }

    render() {
        const modalBody = (
            <p>Do you want to delete this Task?</p>
        )

        return (
            <div className="taskTable">
                <Table bordered hover>
                    <tbody>
                        {this.props.data.map((row, idx) => this.renderTask(row, idx))}
                    </tbody>
                </Table>

                <Modal
                    animation={false}
                    confirmationText="Delete"
                    handleCancel={this.toggleDeleteModal}
                    handleConfirm={this.handleDeleteTask}
                    modalBody={modalBody}
                    onHide={this.toggleDeleteModal}
                    show={this.state.openDeleteModal}
                    size="sm"
                    title="Delete Task"
                >
                </Modal>
            </div>
        )
    }
}

index.propTypes = {
    data: PropTypes.array.isRequired,
    handleTaskDelete: PropTypes.func.isRequired
}

export default index