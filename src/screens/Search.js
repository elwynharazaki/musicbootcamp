import React, { Component } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, FormInput } from 'react-native-elements';

import Card from './../components/Card';
import CardSection from './../components/CardSection';

class Search extends Component {
   static navigationOptions = () => {
      return {
         title: 'MUSICIANIST'
      };
   }

   state = { artist: '', artistName: '', }

   async onPressed() {
      const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.artistName}&api_key=0908ef01f6042ac9824ed9683db53312&format=json`;

      await axios.get(url)
         .then((result) => {
            // console.log(result)
            this.setState({ artist: result.data.results.artistmatches.artist });
         });
   }

   albumClicked(name) {
      this.props.navigation.navigate('result', { artistName: name });
   }

   showResult() {
      console.log(this.state.artist);
      if (this.state.artist) {
         return this.state.artist.map((data, index) =>
            <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
               <Card>
                  <CardSection>
                     <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <Text>{data.name}</Text>
                        <Text>{data.listeners}</Text>
                     </View>
                  </CardSection>

                  <CardSection>
                     <Image
                        source={{ uri: data.image['3']['#text'] }}
                        style={{ width: 350, height: 350 }}
                     />
                  </CardSection>

                  <CardSection>
                     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                     <Button
                        title="VIEW ALBUMS"
                        icon={{ name: 'library-music' }}
                        small
                        backgroundColor='rgba(0, 122, 255, 1)'
                        onPress={this.albumClicked.bind(this, data.name)}
                     />
                     </View>
                  </CardSection>
               </Card>
            </View>
         );
      }
   }

   render() {
      return (
        <View style={{ flex: 1 }}> 
         <Card>
            <View>
               <FormInput
                  placeholder='ARTIST NAME'
                  underlineColorAndroid='transparent'
                  onChangeText={text => this.setState({ artistName: text })}
               />
            </View>

            <View style={styles.buttonStyle}>
               <Button
                  title='SEARCH'
                  medium
                  color='#FFFFFF'
                  backgroundColor='rgba(0, 122, 255, 1)'
                  icon={{ name: 'search' }}
                  onPress={this.onPressed.bind(this)}
               />
            </View>
         </Card>

         <ScrollView>
         {this.showResult()}
         </ScrollView>
         </View>
      );
   }
}

const styles = {
   buttonStyle: {
      paddingBottom: 10,
      paddingTop: 10
   },
   formInputContainer: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20
   }
};

export default Search;
