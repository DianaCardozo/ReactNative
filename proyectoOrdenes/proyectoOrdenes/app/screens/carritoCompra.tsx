import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { obtenerCarrito, vaciarCarrito, eliminarDelCarrito, guardarHistorial } from '@/hooks/storage';

export interface Compra {
  id: string;
  date: string;
  items: CarritoItem[];
  totalSinEnvio: number;
  costoEnvio: number;
  totalConEnvio: number;
}

export interface CarritoItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<any[]>([]);  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    cargarCarrito();
  }, []);
  
  const cargarCarrito = async () => {
    const itemsCarrito = await obtenerCarrito();
    console.log("Carrito cargado:", itemsCarrito);
    setCarrito(itemsCarrito);
  };
  
  const confirmarCompra = async () => {
    if (carrito.length === 0) {
      setModalMessage("Carrito vacío.");
      setModalVisible(true);
      return;
    }
    const { totalSinEnvio, costoEnvio, totalConEnvio } = calcularTotal();
    const compra: Compra = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
      items: carrito,
      totalSinEnvio, 
      costoEnvio,
      totalConEnvio,
    };
    console.log("Procesando compra...");
    await guardarHistorial(compra);
    await vaciarCarrito();
    setModalMessage("¡Compra realizada!");
    setModalVisible(true);        
    cargarCarrito();
  };
  
  const eliminarItem = async (id: string) => {
    console.log("Eliminando item con ID:", id);
    await eliminarDelCarrito(id);
    cargarCarrito();
    setModalMessage("Producto eliminado.");
    setModalVisible(true);
  };
  
  const modificarCantidad = (id: string, cantidad: number) => {
    const newCarrito = carrito.map(item => {
      if (item.id === id) {
        return { ...item, cantidad };
      }
      return item;
    });
    setCarrito(newCarrito);
  };
  
  const calcularTotal = () => {
    const totalSinEnvio = carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
    let costoEnvio = 5000;
  
    if (totalSinEnvio > 90000) {
      costoEnvio = 0;
    } else if (totalSinEnvio > 70000) {
      costoEnvio = 3000;
    }
  
    const totalConEnvio = totalSinEnvio + costoEnvio;
  
    return { totalSinEnvio, costoEnvio, totalConEnvio };
  };
  
  const { totalSinEnvio, costoEnvio, totalConEnvio } = calcularTotal();
  
  const renderItem = ({ item }: { item: CarritoItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <Text style={styles.itemCantidad}>Cant: {item.cantidad}</Text>
  
      <View style={styles.cantidadContainer}>
        <Button title="-" onPress={() => modificarCantidad(item.id, Math.max(1, item.cantidad - 1))} />
        <Text style={styles.cantidadText}>{item.cantidad}</Text>
        <Button title="+" onPress={() => modificarCantidad(item.id, item.cantidad + 1)} />
      </View>
      <TouchableOpacity style={styles.eliminarButton} onPress={() => eliminarItem(item.id)}>
        <Text style={styles.eliminarButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
  
  const cancelarPedido = async () => {
    await vaciarCarrito();
    await cargarCarrito();
    setModalMessage("Pedido cancelado.");
    setModalVisible(true);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total sin Envío: ${totalSinEnvio}</Text>
        <Text style={styles.totalText}>Costo de Envío: ${costoEnvio}</Text>
        <Text style={styles.totalText}>Total a Pagar: ${totalConEnvio}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={confirmarCompra}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Confirmar Compra</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={cancelarPedido}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Cancelar Pedido</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="Aceptar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f4f4f4',
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 15,
      color: '#2c3e50',
      textAlign: 'center',
    },
    itemContainer: {
      marginBottom: 18,
      padding: 12,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#333',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    itemName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#34495e',
    },
    itemPrice: {
      fontSize: 14,
      color: '#27ae60',
      marginTop: 5,
    },
    itemCantidad: {
      fontSize: 12,
      color: '#7f8c8d',
      marginTop: 4,
    },
    cantidadContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    cantidadText: {
      fontSize: 18,
      marginHorizontal: 12,
    },
    eliminarButton: {
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#e74c3c',
      borderRadius: 6,
      alignItems: 'center',
    },
    eliminarButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    totalContainer: {
      marginTop: 25,
      padding: 12,
      backgroundColor: '#ecf0f1',
      borderRadius: 10,
    },
    totalText: {
      fontSize: 14,
      color: '#34495e',
      marginBottom: 8,
    },
    buttonContainer: {
      marginTop: 15,
      backgroundColor: '#2980b9',
      borderRadius: 5,
    },
    button: {
      padding: 14,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: 280,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    modalText: {
      fontSize: 16,
      color: '#2c3e50',
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  
  export default Carrito;
  