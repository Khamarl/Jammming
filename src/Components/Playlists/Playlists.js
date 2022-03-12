import React from 'react';
import './Playlists.css';
import Tracklist from '../Tracklist/Tracklist';

 class Playlists extends React.Component {
     constructor(props){
         super(props);
         this.handleNameChange = this.handleNameChange.bind(this);
     }
     handleNameChange(event){
        this.props.onNameChange(event.target.value)
     }
    render() {
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'}
                        onChange={this.handleNameChange}/>
                <Tracklist tracks={this.props.playlistTracks}
                            onRemove={this.props.onRemove} 
                            isRemoval={true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
 
}
export default Playlists; 