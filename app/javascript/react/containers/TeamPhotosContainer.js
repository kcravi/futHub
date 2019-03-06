import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class TeamPhotosContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: '',
      files: [],
      image: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addTeamPhotos = this.addTeamPhotos.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.plusSlides = this.plusSlides.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/teams/${this.props.params.id}/team_photos.json`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        photos: body.photos
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event){
    event.preventDefault()
    let payload = new FormData();

    for (let file of this.state.files){
      payload.append("photos[]", file)
    }

    this.addTeamPhotos(payload)
    this.setState({ files: [] })
  }

  addTeamPhotos(payload){
    fetch(`/api/v1/teams/${this.props.params.id}/team_photos.json`, {
     credentials: 'same-origin',
     method: 'POST',
     body: payload
   })
   .then(response => {
     if(response.ok){
       return response
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
       error = new Error(errorMessage)
       throw(error)
      }
    })
   .then(response => response.json())
   .then(body => {
     this.setState({
       photos: body.team_photos
     })
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onDrop(files) {
   if(files.length > 0) {
     this.setState({ files: files })
   }
 }

 handleClick(image){
   this.setState({
     image: image
   })
 }

 plusSlides(num, img){
   let index;
   let image = this.state.photos.filter((photo, i)=>{
     if (photo.url == img.url){
       index = i
     }
   })
   let imageIndex;
   if (num+index < 0){
     imageIndex = this.state.photos.length - 1
   } else if (num+index > 0 && num+index < this.state.photos.length){
     imageIndex = num+index
   } else {
     imageIndex = 0
   }
   this.setState({
     image: this.state.photos[imageIndex]
   })
 }

  render(){
    let dropzoneStyle = {
      width: 150,
      height: 150,
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5
    };
    let images;
    if (this.state.photos){
      images = this.state.photos.map((photo, i)=>{
        return(
          <li key={photo.url}
              id={i}
              className="team-images-li"
              onClick={()=>{
                this.handleClick(photo)
              }}>
              <img src={photo.small.url}  />
          </li>
        )
      })
    }
    // <a href={`/teams/${this.props.params.id}/team_photos/${i+1}`} >
    // </a>


    let image = this.state.image ?
      (
        <div className="row">
          <div className="small-12 medium-8 columns team-image-div">
            <a className="prev" onClick={()=>this.plusSlides(-1, this.state.image)}>&#10094;</a>
            <img src={this.state.image.medium.url} className="team-image" />
            <a className="next" onClick={()=>this.plusSlides(1, this.state.image)}>&#10095;</a>
          </div>
          <div className="small-12 medium-4 columns">
            <h4>Comments</h4><hr/>
            <ul className="striped-list">
              <li>Hello World</li>
              <li>Its Soccer Time</li>
              <li>Indeed it is!</li>
            </ul>
            <br/><br/><br/><br/><br/>
            <form className="team-photo-comments-form">
              <span>
                <input type="text" placeholder="Comments" className="team-photo-comments-form-span" />
              </span>
              <button className="button buttonx" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )
       : null ;

    return(
      <div className="team-albums">
        <h3>Team-Albums</h3><hr/>
          {image}
        <ul className="team-images-ul">
          {images}
        </ul>
        <hr/>
        <form onSubmit={this.handleSubmit} className="team-photo-dropzone">
            <section >
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop} multiple={true} style={dropzoneStyle} >
                  <p className="dropzone-content">Drop files here, or Click to upload.</p>
                </Dropzone>
              </div>
              <aside>
                <ul className="uploaded-file-ul">
                  {this.state.files.map(f => <li key={f.name}> * {f.name} - {f.size} bytes</li>)}
                </ul>
              </aside>
            </section>
              <button className="button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default TeamPhotosContainer;
