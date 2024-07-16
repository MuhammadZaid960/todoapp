import { Alert, Image, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { getAvatar, Iuser } from "@/utils/helper";
import NewButton from "./NewButton";
import { LinearGradient } from "expo-linear-gradient";

interface Iprops extends Iuser {
  handleDelete: (id: number) => void;
  handleStatus?: (id: number) => void;
}
const Card = ({
  id,
  userName,
  userTask,
  isCompleted = true,
  isDeleted,
  handleStatus,
  handleDelete,
}: Iprops) => {
  const deleteIcon = require("@/assets/images/delete.png");
  const statusIcon = isCompleted
    ? require("@/assets/images/cross.png")
    : require("@/assets/images/tick1.png");
  const isComDel = isCompleted && isDeleted;
  const backgroundColor = isCompleted || isComDel ? "#EAFFEA" : "#FFFFFF";
  const status = isComDel
    ? "Deleted"
    : isCompleted
    ? "Completed"
    : isDeleted
    ? "Deleted"
    : "Active";
  const statusBack = isComDel
    ? "#DA4F4F33"
    : isCompleted
    ? "#3376361A"
    : isDeleted
    ? "#DA4F4F33"
    : "#F2B45733";
  const statusColor = isComDel
    ? "#DA4F4F"
    : isCompleted
    ? "#337636"
    : isDeleted
    ? "#DA4F4F"
    : "#F2B457";

  const getEven = (num: number): boolean => num % 2 === 0;
  const isEven = getEven(id);
  return (
    <ThemedView style={[{ backgroundColor }, styles.card]}>
      <ThemedView style={[{ backgroundColor }, styles.user]}>
        <LinearGradient
          colors={isEven ? ["#0061FF", "#5FFEFF"] : ["#CCB5FF", "#4C30FF"]}
          style={[styles.avatar]}
        >
          <ThemedText Color="#ffffff" style={[styles.avatarText]}>
            {getAvatar(userName.trim())}
          </ThemedText>
        </LinearGradient>
        <ThemedText type="normal" Color="#666666" style={{ flexGrow: 1 }}>
          {userName.trim()}
        </ThemedText>
        {!isDeleted && (
          <ThemedView style={[{ backgroundColor }, styles.images]}>
            <NewButton
              isImage
              style={{ height: "auto" }}
              onPress={() => handleDelete?.(id as number)}
            >
              <Image style={{ cursor: "pointer" }} source={deleteIcon} />
            </NewButton>
            <NewButton
              isImage
              style={{ height: "auto" }}
              onPress={() => handleStatus?.(id as number)}
            >
              <Image style={{ cursor: "pointer" }} source={statusIcon} />
            </NewButton>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedText type="normal" Color="#000000">
        {userTask.trim()}
      </ThemedText>
      <ThemedText
        Color={statusColor}
        style={[{ backgroundColor: statusBack }, styles.status]}
      >
        {status}
      </ThemedText>
    </ThemedView>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  user: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  images: { flexDirection: "row", gap: 10 },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
