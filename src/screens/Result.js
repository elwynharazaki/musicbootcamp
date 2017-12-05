import React, { Component } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-elements';

import Card from './../components/Card';
import CardSection from './../components/CardSection';

class Result extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: navigation.state.params.artistName,
      };
   }

   state = {
      albums: '',
      artistName: this.props.navigation.state.params.artistName
   }
  
   async componentDidMount() {
      const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${this.state.artistName}&api_key=0908ef01f6042ac9824ed9683db53312&format=json`;

      await axios.get(url)
         .then((result) => {
            this.setState({ albums: result.data.topalbums.album });
         });
   }  

   trackClicked({ artistName, albumName }) {
      this.props.navigation.navigate('detail', { artistName, albumName });
   }
  
   renderAlbums() {
      if (this.state.albums) {
         return (
            this.state.albums.map((album, index) => {
               return (
                  <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
                     <Card>
                        <CardSection>
                           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ fontWeight: 'bold' }}>{album.name}</Text>
                              <Text>{album.playcount} Times Played</Text>
                           </View>
                        </CardSection>

                        <CardSection>
                           <Image 
                              source={{ uri: album.image['3']['#text'] }}
                              style={{ width: 350, height: 350 }} 
                           />
                        </CardSection>
              
                        <CardSection>
                           <Button
                              title='VIEW TRACKS'
                              icon={{ name: 'library-music' }}
                              small
                              backgroundColor='rgba(0, 122, 255, 1)'
                              onPress={this.trackClicked.bind(this, {
                                 artistName: this.state.artistName,
                                 albumName: album.name })}
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
            <Text>{this.props.navigation.state.params.name}</Text>
               <ScrollView>
                  {this.renderAlbums()}
               </ScrollView>
         </View>
      );
   }
}

export default Result;
