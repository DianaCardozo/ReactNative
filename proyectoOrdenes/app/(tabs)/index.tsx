import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos el ícono de FontAwesome
import { Picker } from '@react-native-picker/picker';
import menuItems from './itemsMenu';

interface Item {
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen: any;
}

export default function HomeScreen() {
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [carritoActivo, setCarritoActivo] = useState(false);
  const [filtroActual, setFiltroActual] = useState("Todos"); 
  const [historial, setHistorial] = useState([]); 
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const handleCantidadChange = (nombre: string, cantidad: string) => {
    setCantidades((prev) => ({ ...prev, [nombre]: parseInt(cantidad) || 0 }));
  };

  const agregarItem = (item: Item) => {
    const cantidad = cantidades[item.nombre] || 1;
    if (cantidad > 0) {
      setCarrito((prev) => [...prev, { ...item, cantidad }]);
      Alert.alert('Item añadido', `${item.nombre} - Cantidad: ${cantidad}`);
    } else {
      Alert.alert('Error añadiendo', 'Seleccione al menos un item.');
    }
  };

  const modificarCantidad = (index, nuevaCantidad) => {
    setCarrito((prev) => {
      const carritoTemporal = [...prev];
      carritoTemporal[index].cantidad = parseInt(nuevaCantidad) || 0;
      return carritoTemporal;
    });
  };

  const removerItem = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return carrito.reduce((valorTotal, item) => valorTotal + item.precio * item.cantidad, 0);
  };

  const calcularDomicilio = () => {
    const totalCompra = calcularTotal();
    if (totalCompra > 90000) {
      return 0;
    } else if (totalCompra > 70000) {
      return 3000;
    } else {
      return 5000;
    }
  };

  const calcularTotalConDomicilio = () => {
    return calcularTotal() + calcularDomicilio();
  };

  const confirmarPedido = () => {
    if (carrito.length === 0) {
      Alert.alert('Error', 'El carrito está vacío.');
      return;
    }
  
    const nuevoPedido = {
      items: [...carrito],
      total: calcularTotalConDomicilio(),
      fecha: new Date()
    };
    setHistorial((prev) => [...prev, nuevoPedido]);
    setCarrito([]); 
    Alert.alert('Pedido confirmado', 'Tu pedido ha sido confirmado.');
  };

  const mostrarCarrito = () => {
    setCarritoActivo(!carritoActivo);
  };
  
  const platosFiltrados = filtroActual === "Todos" 
    ? menuItems 
    : menuItems.filter((item) => item.tipo === filtroActual);
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Proyecto Ordenes</Text>
      </View>

      <TouchableOpacity onPress={mostrarCarrito} style={styles.cartButton}>
      {carritoActivo ? (
        
        <Icon name="home" size={35} color="#fff" />
      ) : (
        
        <Icon name="shopping-cart" size={35} color="#fff" />
      )}
    </TouchableOpacity>

      {carritoActivo ? (
        <View style={styles.carritoContainer}>
            <Text style={styles.carritoTitle}>Carrito</Text>
            {carrito.length > 0 ? (
              carrito.map((item, index) => (
                <View key={index} style={styles.carritoItem}>
                  <Text style={styles.itemPedidoText}>Item: {item.nombre}</Text>
                  <Text style={styles.itemPedidoText}>Cantidad: {item.cantidad}</Text>
                  <Text style={styles.itemPedidoText}>Valor ${item.precio * item.cantidad}</Text>
                  <TouchableOpacity style={styles.eliminarButton} onPress={() => removerItem(index)}>
                    <Text style={styles.eliminarButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyCartText}>El carrito está vacío.</Text>
            )}
            <Text style={styles.boldText}>Valor items: ${calcularTotal()}</Text>
            <Text style={styles.boldText}>Valor domicilio: ${calcularDomicilio()}</Text>
            <Text style={styles.boldText}>Valor total: ${calcularTotalConDomicilio()}</Text>
            <Button title="CONFIRMAR PEDIDO" onPress={confirmarPedido} />
            <Button title="VER HISTORIAL DE PEDIDOS" onPress={() => setMostrarHistorial(!mostrarHistorial)} />

          {mostrarHistorial && (
              <View style={styles.historialContainer}>
                <Text style={styles.historialTitulo}>Historial de Pedidos</Text>
                <ScrollView>
                  {historial.map((pedido, index) => (
                    <View key={index} style={styles.pedido}>
                      <Text style={styles.pedidoFecha}>Fecha: {pedido.fecha}</Text>
                      <Text style={styles.pedidoTotal}>Total: ${pedido.total}</Text>
                      {pedido.items.map((item, itemIndex) => (
                        <Text key={itemIndex} style={styles.pedidoItem}>{item.nombre} x{item.cantidad}</Text>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

        
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.pickerContainer}>
            <Picker
              selectedValue={filtroActual}
              onValueChange={(itemValue) => setFiltroActual(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Todos" value="Todos" />
              {[...new Set(menuItems.map((plato) => plato.tipo))].map((tipo) => (
                <Picker.Item key={tipo} label={tipo} value={tipo} />
              ))}
            </Picker>
          </TouchableOpacity>

          <ScrollView style={styles.menuContainer}>
            {platosFiltrados.map((plato, index) => (
              <View key={index} style={styles.menuItem}>
                <Image source={plato.imagen} style={{ width: 100, height: 100 }} />
                <Text style={styles.menuItemTitle}>{plato.nombre}</Text>
                <Text style={styles.menuItemType}>{plato.tipo}</Text>
                <Text style={styles.menuItemDescription}>{plato.descripcion}</Text>
                <Text style={styles.menuItemPrice}>Precio: ${plato.precio} COP</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  onChangeText={(value) => handleCantidadChange(plato.nombre, value)}
                  value={cantidades[plato.nombre]?.toString() || '1'}
                />

                <Button title="Añadir al carrito" onPress={() => agregarItem(plato)} />
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );  
}
