import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'

export default function EnrollmentsInfo() {
  return (
    <View style={styles.container}>
        <View style={[styles.enrolmentContainer,{borderColor:"rgba(102, 94, 223, 0.8)",backgroundColor:"rgba(102, 94, 223, 0.08)"}]}>
            <Text style={[styles.header,{color:"rgba(102, 94, 223, 1)"}]}>Enrollments</Text>
            <Text style={[styles.number,{color:"rgba(102, 94, 223, 1)"}]}>100</Text>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container: {
        marginVertical:"240",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        gap:10
    },
    enrolmentContainer:{
        padding:25,
        display:"flex",
        gap:10,
        alignItems:"center",
        borderRadius:10,
        borderWidth:2,
        borderStyle:"solid",
    },
    header:{
        fontSize:20,
        fontWeight:"600"
    },
    number:{
        fontSize:16,

    }
})
