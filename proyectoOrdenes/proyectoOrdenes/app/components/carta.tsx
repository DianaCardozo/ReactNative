import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

interface Carta {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface CartaProps {
  plato: Carta;
}

const PlatoCarta: React.FC<CartaProps> = ({ plato }) => {
  const router = useRouter();

  const verDetalles = () => {
    router.push(`/screens/detalle?id=${plato.id}&name=${plato.name}&image=${plato.image}&price=${plato.price}&description=${plato.description}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: plato.image }} style={styles.image} />
      <View style={styles.info} >
        <Text style={styles.name}>{plato.name}</Text>
        <Text style={styles.price}>${plato.price}</Text>
        <Text style={styles.description}>{plato.description}</Text>
        <Button title="Ver Detalle"  onPress={verDetalles}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      padding: 18,
      marginVertical: 10,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 5,
      overflow: 'hidden',
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 12,
      marginRight: 18,
      resizeMode: 'cover',
    },
    info: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 12,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    price: {
      fontSize: 18,
      color: '#28a745',
      fontWeight: '500',
      marginBottom: 6,
    },
    description: {
      fontSize: 15,
      color: '#555',
      marginBottom: 10,
      lineHeight: 22,
    },
    button: {
      backgroundColor: '#007aff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignItems: 'center',
      alignSelf: 'flex-start',
      elevation: 2,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      textTransform: 'uppercase',
    }
  });
  
  export default Carta;
  