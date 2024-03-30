import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { PaperProvider, Checkbox, Button,Appbar, Card} from 'react-native-paper';
import { useState, useEffect} from 'react';
import { useFonts } from 'expo-font';

// Ideas to implement later: -> Deletion
//                           -> Search functionality
//                           -> Local storage durability

function Tasks({items, toggleCheckbox}) {
  
  return (
    <View style={{marginTop: 20, height: '70%', }}>
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <ItemCard item={item} onToggleCheckbox={toggleCheckbox} />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={{width: '100%',}}
      scrollEnabled={true}
    />
  </View>
  );
}

const ItemCard = ({ item, onToggleCheckbox }) => {
  const [timer, setTimer] = useState(3601);

  useEffect(() => {
    if(!item.checked && timer > 0) {
    let intervalId;
      intervalId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

    return () => clearInterval(intervalId);
    }
  }, [timer, item.checked]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
  <Card style={{ marginBottom: 10, width: '100%',backgroundColor: 'white', borderWidth:1, borderColor: 'lightblue'}}>
    <Card.Content style={{width: '100%', fontFamily: 'Inter-Medium', fontSize: 20,}}> 
    <View style={{ flexDirection: 'row', alignItems: 'center' , width: '100%', justifyContent: 'space-between'}}>
    <Text style={{width: '65%',fontFamily: 'Inter-Medium', fontSize: 17,textDecorationLine: item.checked ? 'line-through' : 'none'}} >{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Checkbox.Item
              status={item.checked ? 'checked' : 'unchecked'}
              onPress={() => onToggleCheckbox(item.id)}
              color='crimson'
            />
      {(
            <Text style={{ marginRight: 20, alignSelf: 'center',textDecorationLine: item.checked ? 'line-through' : 'none' }}>{formatTime(timer)}</Text>
          )}
          </View>
    </View>
    </Card.Content>
  </Card>
);
}

export default function App() {
  // const [taskTracker, setTaskTracker] = useState([]);
  const [text, setText] = useState('');

  function handleButtonClick() {
    if(text.length === 0){
      return;
    }
    // console.log(taskTracker);
    setItems([...items, {id: items.length + 1, name: text, checked: false}]);
    setText('');
  }

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
  });

  const [items, setItems] = useState([ 
    { id: 1, name: 'Thodi thodi hai sabki suni thoda kuch toh sabne kaha', checked: false },
    { id: 2, name: 'thoda thoda samjha bhi magar dil yeh maane kahaan', checked: false },
    { id: 3, name: 'Bass iski zidd hain, dil befikar lapta kaisi yeh dhun hain khokar bhi kuch na mila', checked: false },
    {id: 4, name: 'Iss dil ki aadat yahi hai Gir kar sambhalta nahi hai', checked: false},
  ]);
  const toggleCheckbox = (itemId) => {
    if(items.find((item) => item.id === itemId).checked){
      return;
    }
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  return (
    <PaperProvider>
    <Appbar.Header style={{marginHorizontal: 10, backgroundColor: 'lightblue',}} 
    mode='center-aligned'
    elevated='true'>
    {/* <Appbar.BackAction onPress={() => {}} /> */}
    <Appbar.Content title="Code / Karma" />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
    <View style={styles.container}>
      <Text style={styles.textWrapper}>What do you want to do in the next 1 hour?</Text>
      <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, marginTop: 8, alignSelf: 'flex-start', color: 'gray',}} numberOfLines={undefined} ellipsizeMode="clip">You can add multiple tasks and check them off as you complete them. Once after additon, tasks cannot be deleted before you complete them.</Text>

      <View style={{flexDirection: 'row', marginTop: 20, width: '100%', justifyContent: 'center', columnGap: 15, alignItems: 'center'}}>
      <TextInput
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder="Enter your task..."
        // keyboardType="alphabet"
        style={{borderWidth: 1,width:'60%',paddingVertical: 10, borderRadius: 10, borderColor: 'lightblue', fontSize: 17, paddingLeft: 10, paddingRight:10,}}
      />
      <Button icon="pencil" mode="contained-tonal" style={{
    backgroundColor: 'lightblue',
    borderRadius: 10,
    elevation: 2, // Add some elevation for better visual feedback on Android
  }}
  contentStyle={{
    paddingVertical: 5, // Ensure padding is within the contentStyle for better spacing
  }}
  labelStyle={{
    fontFamily: 'Inter-Medium',
    color: 'crimson',
    fontWeight: 'bold',
    fontSize: 17, // Adjust font size for better visibility
  }}
      onPress={() => handleButtonClick()}>
      Add task</Button>
      </View>
      <Tasks items={items} toggleCheckbox={toggleCheckbox} />
      <StatusBar style="auto" />
    </View>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: 10,
    marginHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textWrapper: {
    // position: 'absolute', 
    marginTop: 20,
    // top: 30,
    // fontWeight: 'bold',
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: 'crimson',
    // textAlign: 'right',
    // alignSelf: 'flex-start',
  }
});
