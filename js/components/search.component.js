import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import _ from 'lodash';

import {selectSong} from '../actions/index.action';
import {fetchDataFromApi} from '../actions/index.action';

import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

const CLIENT_ID = 'l8b1LlbFBGgDJmPurEkqHuuUHDVckbWK';


const styles = {
    playlist: {
    display: 'block',
    },
    loadBtnGroup: {
        width: '100%',
        display: 'inline-block'
    },
    load: {
        backgroundColor: '#1f1f1f',
        fontSize: 12,
        width: '50%',
    },
    results: {
                width: '100%',
                maxHeight: 400,
                color: '#44def6',
                backgroundColor: 'black',
                overflow: 'auto',
                margin: 'auto',
                border: '5px solid #1f1f1f',
            }
    }



class Search extends React.Component {
    constructor(props) {
        super(props)

    this.state = {
            open: false,
        };

                this.handleTouchTap = () => {
            this.setState({
            open: true,
            });
        };
    }
search() {
        const input = document.getElementsByTagName('input')[0].value;
        this.props.fetchData(input)
    }

  renderList() {
    return this.props.tracks.map((track, index) => {
            return (
            {
          text: track.title,
            value: (
                <MenuItem
                    disabled={true}
                    primaryText={
                        <li className="list-group-item">
                        <div className="video-list media">
                            <div className="media-left">
                                <img className="media-object" src={track.artwork_url}/>
                            </div>
                            <div className="media-body">
                                <a href={track.user.permalink_url} className="media-heading">{track.title}</a>
                            </div>
                            <div style={styles.loadBtnGroup}>
                                <button style={styles.load} onTouchTap={() => {this.props.selectSong(
                                    {title:track.title,
                                    url: track.stream_url + '?client_id=' + CLIENT_ID,
                                    cover: track.artwork_url
                                    }, '_DECK1'),
                                    this.handleTouchTap()
                                    }}
                                    >
                                    LOAD TO DECK 1
                                </button>
                                <button style={styles.load} onTouchTap={() => {
                                    this.props.selectSong(
                                    {title:track.title,
                                    url: track.stream_url + '?client_id=' + CLIENT_ID,
                                    cover: track.artwork_url
                                    }, '_DECK2'),
                                    this.handleTouchTap()
                                    }}
                                    >
                                    LOAD TO DECK 2
                                </button>
                            </div>
                        </div>
                        </li>
                        }
                    />),
                url: track.stream_url
                }
            );
        });
  }

  render() {

    const dataArray = this.renderList();

    const scSearch = _.debounce((e) => {this.search()}, 500);

    return (
        <div>
       <AutoComplete
                anchorOrigin={{vertical: 'bottom', horizontal: 'middle'}}
                targetOrigin={{vertical: 'top', horizontal: 'middle'}}
                className={this.props.className}
                style={this.props.style}
                textFieldStyle={this.props.textFieldStyle}
                underlineStyle={this.props.underlineStyle}
                listStyle={styles.results}
                popoverProps={{useLayerForClickAway: false, style:{width: '55%', backgroundColor: 'black'}}}
                menuStyle={{width: '100%',}}
                hintText={this.props.hintText}
                onUpdateInput={scSearch}
                onNewRequest={this.handleNewRequest}
                dataSource={dataArray}
                dataSourceConfig={{text: 'text', value: 'value'}}
                filter={AutoComplete.caseInsensitiveFilter}
                fullWidth={true}
                openOnFocus={true}
            />
            <Snackbar
                open={this.state.open}
                message="Success!"
                autoHideDuration={2000}
                contentStyle={{color: "#22bcd4"}}
                style={{border: "2px solid #22bcd4"}}
            />
            </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tracks: state.decksReducer.searchResults.tracks
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectSong: selectSong, fetchData: fetchDataFromApi}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
