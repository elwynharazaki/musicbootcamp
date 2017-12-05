import React, { Component } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-elements';

import Card from './../components/Card';
import CardSection from './../components/CardSection';

class Detail extends Component {
      static navigationOptions = ({ navigation }) => {
          return {
              title: navigation.state.params.albumName,
          };
      }

      state = {
          tracks: '',
          albumName: this.props.navigation.state.params.albumName,
          artistName: this.props.navigation.state.params.artistName
      }

   async componentDidMount() {
   const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=0908ef01f6042ac9824ed9683db53312&artist=${this.state.artistName}&album=${this.state.albumName}&format=json`;

   await axios.get(url)
      .then((result) => {
         console.log(result);
         this.setState({ tracks: result.data.album.tracks });
      });
   }

   clickPlay(url) {
      Linking.openURL(url);
   }

   renderTracks() {
      if (this.state.tracks) {
         console.log(this.state.tracks);
         return (
            this.state.tracks.track.map((track, index) => {
               return (
                  <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
                     <Card>
                        <CardSection>
                           <Text>{track.name}</Text>
                           <Text>Duration: {track.duration} sec</Text>
                        </CardSection>
                     
                        <CardSection>
                           <Button
                              title='PLAY SONG'
                              icon={{ name: 'play-circle-outline' }}
                              small
                              backgroundColor='rgba(0, 122, 255, 1)'
                              onPress={this.clickPlay.bind(this, track.url)}
                           />
                        </CardSection>
                     </Card>
                  </View>
               );
            })
         );
      }
   }

   render() {
      return (
         <View>
            <ScrollView>
               {this.renderTracks()}
            </ScrollView>
         </View>
      );
   }
}

export default Detail;
