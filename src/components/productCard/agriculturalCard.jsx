import { Link } from 'react-router-dom'

export default function AgriculturalCard(props) {
  return (
    <div
      className="card-flyer card-flyer_aricultural "
      style={{ background: '#1E1E1E' }}
    >
      <Link to={`/service/${props.id}`}>
        <div className="text-box">
          <div className="image-box">
            <img src={props.image} alt="" />
          </div>
          <div className="text-container text-center">
            <h3 className="fs-3 mt-3">{props.title}</h3>
            <p className="font-dark mt-2 lh-base">{props.content}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
