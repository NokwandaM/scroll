import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'

faker.seed(10);
const DATA = [...Array(50).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const BIG_IMG ='https://images.pexels.com/photos/7392329/pexels-photo-7392329.jpeg?cs=srgb&dl=pexels-melike-b-7392329.jpg&fm=jpg'
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

export default () => {
    const scrollY = React.useRef(new Animated.Value(0)).current

    return <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          source={{uri:BIG_IMG}}
          style={StyleSheet.absoluteFillObject}
          blurRadius={80}
        />
        <Animated.FlatList
          data={DATA}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset:{y:scrollY}}}],
            {useNativeDriver:true}
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            padding:SPACING,
            paddingTop:StatusBar.currentHeight || 42
          }}
          renderItem={({item, index}) => {
            const inputRange = [
               -1, 
               0,
               ITEM_SIZE * index,
               ITEM_SIZE * (index + 2)
            ]

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1,1,1,0]
            })

            return <Animated.View style={{
              flexDirection:'row',
              padding:SPACING, 
              marginBottom:SPACING, 
              borderRadius:12, 
              backgroundColor: 'rgb(255,255,255,9)', 
              shadowColor:'#000', 
              shadowOffset:{width: 0,height: 10}, 
              shadowOpacity:.5, 
              shadowRadius:20,
              transform: [{scale}]
              }}>
              <Image
                source={{uri:item.image}}
                style={{
                  width: AVATAR_SIZE, height: AVATAR_SIZE,borderRadius:AVATAR_SIZE,
                  marginRight:SPACING/2
                }}
              />
              <View>
                <Text style={{fontSize:22, fontWeight:'700'}}>{item.name}</Text>
                <Text style={{fontSize:18, opacity:.7}}>{item.jobTitle}</Text>
                <Text style={{fontSize:12, opacity:.8, color:'#0099cc'}}>{item.email}</Text>
              </View>
            </Animated.View>
          }

          }
        />
    </View>
}