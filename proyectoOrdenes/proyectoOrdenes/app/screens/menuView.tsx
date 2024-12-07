import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PlatoCarta from '../components/PlatoCarta';


interface Plato {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

const platos: Plato[] = [
  { id: 1, name: 'Aguapanela', category: 'Bebidas Refrescantes', image: '../assets/images/Limonada.png', price: 5000, description: 'Aguapanela fresca con limón' },
  { id: 2, name: 'Limonada de Jengibre', category: 'Bebidas Refrescantes', image: '../assets/images/CocaCola.png', price: 5000, description: 'Refrescante limonada con un toque de jengibre' },
  { id: 3, name: 'Café de Olla', category: 'Bebidas Calientes', image: '../assets/images/Cafe.png', price: 4000, description: 'Café artesanal preparado a la olla' },
  { id: 4, name: 'Té Verde', category: 'Bebidas Calientes', image: '../assets/images/Chocolate.png', price: 6000, description: 'Té verde fresco con miel' },
  { id: 5, name: 'Sopa de Lentejas', category: 'Sopas', image: '../assets/images/sancocho.png', price: 15000, description: 'Sopa casera de lentejas con vegetales' },
  { id: 6, name: 'Sopa de Pollo con Fideos', category: 'Sopas', image: '../assets/images/ajiaco.png', price: 15000, description: 'Sopa reconfortante de pollo con fideos caseros' },
  { id: 7, name: 'Gnocchis al Pesto', category: 'Platos del Día', image: '../assets/images/ratatouille.png', price: 30000, description: 'Gnocchis acompañados de una deliciosa salsa pesto' },
  { id: 8, name: 'Risotto de Setas', category: 'Platos del Día', image: '../assets/images/lasagna.png', price: 30000, description: 'Risotto cremoso con setas frescas' },
  { id: 9, name: 'Pollo al Curry', category: 'Platos a la Carta', image: '../assets/images/pechuga.png', price: 25000, description: 'Pollo jugoso al curry con arroz basmati' },
  { id: 10, name: 'Tacos al Pastor', category: 'Platos a la Carta', image: '../assets/images/Picada.png', price: 25000, description: 'Tacos de cerdo al pastor con piña' },
  { id: 11, name: 'Pasta Infantil', category: 'Menú Infantil', image: '../assets/images/hamburguesa.png', price: 20000, description: 'Pasta con salsa suave para los más pequeños' },
  { id: 12, name: 'Mini Hamburguesa', category: 'Menú Infantil', image: '../assets/images/pizza.png', price: 20000, description: 'Mini hamburguesa con queso derretido' },
  // Agrega más platos según sea necesario
];

const Menu: React.FC = () => {
  const [CategoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');

  const filteredPlatos = CategoriaSeleccionada === 'Todas'
    ? platos
    : platos.filter(plato => plato.category === CategoriaSeleccionada);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <View style={styles.categoryContainer}>
        {['Todas', 'Bebidas Refrescantes', 'Bebidas Calientes', 'Sopas', 'Platos del Día', 'Platos a la Carta', 'Menú Infantil'].map(category => (
          <TouchableOpacity key={category} onPress={() => setCategoriaSeleccionada(category)} style={styles.BotonCatergoria}>
            <Text style={[styles.CategoriaTexto, CategoriaSeleccionada === category && styles.CategoriaSeleccionada]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredPlatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id}>
            <PlatoCarta plato={item}/>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    alignSelf: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'center',
  },
  BotonCatergoria: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  CategoriaTexto: {
    fontSize: 18,
    color: '#333',
  },
  CategoriaSeleccionada: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});

export default Menu;
