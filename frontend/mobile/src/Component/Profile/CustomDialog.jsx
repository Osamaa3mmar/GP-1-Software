import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Dialog, Modal, Portal } from 'react-native-paper'

export default function CustomDialog({children,setStatus,status,current}) {
  const showDialog = () => setStatus(true);
  const hideDialog = () => setStatus(false);
  const [info,setInfo]=useState('');

  return (
    
   <Portal>
        <Modal visible={status} onDismiss={hideDialog} contentContainerStyle={styles.cont}>
            <Text style={styles.header}> {current}</Text>
            {children}
        </Modal>
      </Portal>
  
  )
}

const styles = StyleSheet.create({
cont:{
    backgroundColor:"white",
    padding:40,
    borderRadius:20,
    width:"90%",
    marginHorizontal:"auto"
},
header:{
    fontSize:24,
    fontWeight:600,
    marginVertical:10
}
})