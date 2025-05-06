"use client"

import { View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { Button, IconButton } from "react-native-paper"

export default function Bio({onPress,isEdit,text}) {
  const [expanded, setExpanded] = useState(false)
  const bioText =text?text:"No Bio Yet"
  const truncatedBio = text?expanded ? bioText : bioText.substring(0, 150) + "...":bioText

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>About Me</Text>
        {/* Add edit button for bio */}
       {isEdit?
       <IconButton onPress={()=>{onPress("bio")}} icon="pencil" size={20} iconColor="rgba(102, 94, 223, 1)" />
       
       :''} 
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{truncatedBio}</Text>
        {text?
        <Button mode="text" onPress={() => setExpanded(!expanded)} labelStyle={styles.readMoreText}>
        {expanded ? "Show Less" : "Read More"}
      </Button>
        :''}
        
      </View>
    </View>
  )
}

// Update styles to include new components
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  bioContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  readMoreText: {
    color: "rgba(102, 94, 223, 1)",
    fontWeight: "600",
  },
  textNoBio: {
    fontSize: 18,
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
})
