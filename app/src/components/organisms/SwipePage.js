import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image, 
} from 'react-native';

import SwipePageHeader from '../molecules/SwipePageHeader';
// TODO : need to document dependencies for this
import TinderCard from 'react-tinder-card'

const db = [
  {
   id: 1,
   url: 'https://picsum.photos/id/0/200/300',
   desc: 'Macbook Air, Priced at: $200'
  },
 
  {
   id: 2,
   url: 'https://picsum.photos/id/157/200/300',
   desc: 'Men\'s Accessory Kit, Priced at: $75',
  },
 
  {
 
   id: 3,
   url: 'https://picsum.photos/id/250/200/300',
   desc: 'Polaroid Camera Year 1999, Priced at $118'
  },
 
  {
   id: 4,
   url: 'https://picsum.photos/id/26/200/300',
   desc: 'Pennyboard (barely used), Priced at $60'
  },

  {
    id: 5,
    url: 'https://picsum.photos/id/370/200/300',
    desc: 'Macbook Pro, Priced at $500'
  }
 
 ];

function SwipePage({}){

  const cards = db;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

	return (
		<SafeAreaView style={{backgroundColor: 'white'}}>
			<SwipePageHeader></SwipePageHeader>

      <View style={styles.cardContainer}>
        <Text style={{zIndex: 0, bottom: -200, marginLeft: 30, fontSize: 15}}>No more items available right now</Text>

        <View style={{flex: 1, flexDirection: 'row'}}>
        </View>

     {cards.map((card) => 

     
     <TinderCard key={card.id} onSwipe={(dir) => swiped(dir, card.id)} onCardLeftScreen={() => outOfFrame(card.id)}>
       <View style={styles.card}>
       <Image style={styles.image} source={{uri: card.url}} name={card.id}></Image>
       <Text style={styles.cardTitle}>{card.desc.toUpperCase()}</Text>
       </View>
     </TinderCard>
     
      
     )
     }

    </View>

    {lastDirection ? <Text style={styles.notif}>You swiped {lastDirection}</Text> : <Text style={styles.notif}/>}
    
    {/* <Footer></Footer> */}
      
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({

  cardContainer: {
    marginLeft: 40,
    marginTop: 0,
  },

  card: {
    position: 'absolute',
    backgroundColor: 'white',
    maxWidth: 260,
    height: 300,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
    
  },

  cardTitle: {
    position: 'absolute',
    bottom: -150,
    margin: 15,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor:'black',
    textShadowRadius: 5,
    textShadowOffset:{width: 1, height: 1},
  },

  image: {
    height: 450,
    width: 300,
    borderRadius: 20,
    overflow: 'hidden'
  },

  notif: {
    bottom: -470,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '35%',
    fontWeight: 'bold',
    fontSize: 15
  }

});


export default SwipePage;