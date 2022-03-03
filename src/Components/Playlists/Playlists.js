import React from 'react';
import './Playlists.css';
import Tracklist from '../Tracklist/Tracklist';

 class Playlists extends React.Component {
    render() {
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <Tracklist tracks={this.props.playlistTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
 
}
export default Playlists; 