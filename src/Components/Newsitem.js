import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, dateOn,source } = this.props;
    return (
      <div className="container my-3">
        <div className="card" style={{ }}>
        
          <img src={!imageUrl?"https://gumlet.assettype.com/bloombergquint%2F2023-08%2Ffff79714-193b-46e0-b71f-b514d7a9901a%2Fhigh_angle_shot_bandra_worli_sealink_mumbai_enveloped_with_fog__1_.jpg?rect=0%2C642%2C6673%2C3503&w=1200&auto=format%2Ccompress&ogImage=true":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-title">{title}
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}
  </span>
            </p>
            <p className="card-text">{!description?"The Enforcement Directorate on Tuesday conducted raids against Hero Motocorp executiv.":description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} updated on  {new Date(dateOn).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark" style={{backgroundColor:'#88e7bf !important'}}>
              Read More
            </a>
          </div>
          
        </div>
      </div>
      
    );
  }
}

export default Newsitem;
