
import React from 'react'
import { Card, CardImg, CardBody, } from 'reactstrap'



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

function RenderCOmments({ comments }){

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

const Dishdetail = (props) => {
    const { dish } = props

    if (dish){
        return (
            <div className="row">
                <RenderDish dish={dish} />
                <RenderCOmments comments={dish.comments}/>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
};

export default Dishdetail

