import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardImg,
    Col,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, Errors, LocalForm} from 'react-redux-form'
import {Loading} from "./LoadingComponent";


function RenderDish({dish}) {

    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} className="card-img-top"/>
                <CardBody>
                    <p className="card-text">{dish.description}</p>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments, addComment, dishId}) {

    return (
        <div className="col-12 col-md-5 m-1">
            <div>
                <h5><b>Comments</b></h5>
                {comments.map((comment) => {
                    return (
                        <div className="text-left">
                            <p>{comment.comment}</p>
                            <p><span>--{comment.author}, {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))}</span></p>
                        </div>
                    )
                })}
            </div>

            <div className="text-left">
                <CommentForm
                    dishId={dishId}
                    addComment={addComment}
                    dishId={dishId}
                />
            </div>
        </div>
    )
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            toggleModal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            toggleModal: !this.state.toggleModal
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    renderModal() {

        return (
            <div>
                <Button onClick={this.toggleModal}><span className="fa fa-pencil fa-lg">Submit Content</span></Button>
                <Modal isOpen={this.state.toggleModal} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                        model=".name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Your Name"
                                        validators={{
                                            maxLength: maxLength(15),
                                            minLength: minLength(2)
                                        }}
                                    />

                                    <Errors
                                        model=".name"
                                        show="touched"
                                        className="text-danger"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less that 15 characters'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".comment"
                                        name="comment"
                                        className="form-control"
                                        rows="6"
                                    />
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" value="submit">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    render() {

        return (
            <>
                {this.renderModal()}
            </>
        )
    }

}

const Dishdetail = ({dish, comments, addComment, isLoading, errMess}) => {

    if (isLoading){
        return(
          <div className="container">
              <div className="row">
                  <Loading/>
              </div>
          </div>
        )
    }

    else if (errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }
    else if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <RenderDish dish={dish}/>
                    <RenderComments
                        comments={comments}
                        addComment={addComment}
                        dishId={dish.id}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
};


export default Dishdetail
