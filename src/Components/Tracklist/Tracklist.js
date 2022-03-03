import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

 class Tracklist extends React.Component {
     
    render() {
        const tracks = this.props.tracks;
        console.log("LOG HERE ---->", this.props.tracks)

        return(
            
            <div className="TrackList">

                {

                    //this.props.tracks.map(track => {

                        //return <Track track={track}

                    //key={track.id} />

                    })
                }

            </div>

        )

    }
    }
 

export default Tracklist; 