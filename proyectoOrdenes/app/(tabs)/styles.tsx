import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#32a852',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    headerText: {
        fontFamily: 'SpaceMono',
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
    },
  
    cartButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: '#32a852',
      padding: 15,
      borderRadius: 30,
      elevation: 5, 
      zIndex: 10,
    },
  
    cartIcon: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: '#32a852', 
      borderRadius: 50, 
      width: 70, 
      height: 70, 
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
  
    homeIcon: {
       width: 30,
      height: 30 
    }, 
  
    carritoContainer: { 
      padding: 20
    },
  
    carritoTitle: {
       fontSize: 20, fontWeight: 'bold' 
    },
  
    pickerContainer: {
      backgroundColor: '#32a852', 
      borderRadius: 5,
      margin: 10,
    },
  
    picker: {
      backgroundColor: '#2494f4',
      color: '#fff', 
      fontSize: 20, 
      height: 45,
      fontWeight: 'bold'
    },
  
  
    menuContainer: {
      padding: 20,
    },
  
    menuItem: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
    },
  
    menuItemTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  
    menuItemType: {
      fontSize: 14,
      color: '#666',
      marginVertical: 5,
    },
  
    menuItemDescription: {
      fontSize: 14,
      color: '#333',
    },
  
    menuItemPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2e8b57',
      marginTop: 5,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginVertical: 10,
      width: 80,
    },
  
    carritoItem: {
      fontSize: 16,
      marginVertical: 5,
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingVertical: 10, 
      borderBottomWidth: 1, 
      borderColor: '#ccc',
    },
    itemPedidoText: {
      fontSize: 14,
      fontFamily: 'monospace',
      marginTop: 10,
    },
    boldText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    emptyCartText: {
      fontSize: 16,
      color: '#999',
      textAlign: 'center',
      marginTop: 20,
    },
  
    eliminarButton: {
      backgroundColor: '#32a852',
      padding: 3, 
      borderRadius: 5,
      marginLeft: 10,
    },
  
    eliminarButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12, 
    },
  
    historialContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#f0f0f5',
      borderRadius: 10,
    },
    historialTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    pedido: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    pedidoFecha: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#555',
    },
    pedidoTotal: {
      fontSize: 14,
      color: '#333',
    },
    pedidoItem: {
      fontSize: 12,
      color: '#666',
    },
  
    botonesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',  
      marginVertical: 10,               
    },
    
    historialTitulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 15,
      textAlign: 'center',
    }
});

export default styles;