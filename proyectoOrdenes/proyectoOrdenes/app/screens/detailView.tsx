import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { agregarAlCarrito } from '@/hooks/storage';

const Detalle: React.FC = () => {
  const { id, name, image, price, description } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);  
  const [cantidad, setCantidad] = useState(1);  
    
  const volverMenu = () => {
    router.back();
  };

  const agregarCarrito = async () => {
    await agregarAlCarrito(
      { id: id as string, name: name as string, image: image as string, price: Number(price), description: description as string },
      cantidad
    );
    setModalVisible(true);

  };

  const cerrarModal = () => {
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Precio: ${price}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.cantidadContainer}>
        <Button title="-" onPress={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)} />
        <Text style={styles.cantidadText}>{cantidad}</Text>
        <Button title="+" onPress={() => setCantidad(cantidad + 1)} />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={agregarCarrito}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Agregar al Carrito</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={volverMenu}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Volver al Menú</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Agregado al carrito!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={cerrarModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={volverMenu}>
              <Text style={styles.modalButtonText}>Volver al Menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 20,
    borderRadius: 12,
    borderColor: '#dee2e6',
    borderWidth: 1,
    resizeMode: 'cover', 
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
    letterSpacing: 0.5, 
  price: {
    fontSize: 22,
    color: '#28a745',
    marginVertical: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 26, 
    marginBottom: 20,
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff', 
  },
  cantidadText: {
    marginHorizontal: 18,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase', 
  },
  buttonContainer: {
    marginVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalContent: {
    width: 320,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 6,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 24,
    color: '#343a40',
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Detalle;
