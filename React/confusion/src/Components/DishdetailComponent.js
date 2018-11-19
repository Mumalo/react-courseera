
import React from 'react'
import { Card, CardImg, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'


function RenderDish({ dish }){

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

function RenderComments({ comments }){

    return (
        <div className="col-12 col-md-5 m-1">
            <h5><b>Comments</b></h5>
            {comments.map((comment) => {
                return (
                    <div className="text-left">
                        <p>{comment.comment}</p>
                        <p><span>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</span></p>
                    </div>
                )
            })}
        </div>
    )
}

const Dishdetail = ({ dish, comments }) => {

    if (dish){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <RenderDish dish={dish} />
                    <RenderComments comments={comments}/>
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

