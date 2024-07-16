import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/Header";
import Input from "@/components/Input";
import NewButton from "@/components/NewButton";
import Card from "@/components/Card";
import { Iuser } from "@/utils/helper";

const filters = ["All", "Completed", "Incompleted", "Deleted"];

const initialUserData: Iuser[] = [
  {
    id: 0,
    userName: "Usman Khan",
    userTask: "Complete the assignment",
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: 1,
    userName: "Hassan Sattar",
    userTask: "Complete the assignment",
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: 2,
    userName: "Mustaq",
    userTask: "Complete the codewars problem",
    isCompleted: true,
    isDeleted: false,
  },
  {
    id: 3,
    userName: "Mustaq Hussain Tarar",
    userTask: "Complete the Webflow work",
    isCompleted: true,
    isDeleted: true,
  },
  {
    id: 4,
    userName: "Kaleem Ullah Jelani",
    userTask: "Complete the Shopify work",
    isCompleted: false,
    isDeleted: true,
  },
  {
    id: 5,
    userName: "Khizar Iqbal",
    userTask: "Complete the WordPress work",
    isCompleted: false,
    isDeleted: false,
  },
  {
    id: 6,
    userName: "Kamran Gul",
    userTask: "Complete the Bubble work",
    isCompleted: false,
    isDeleted: false,
  },
];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentId, setCurrentId] = useState<number>(6);
  const [userName, setUserName] = useState("");
  const [userTask, setUserTask] = useState("");
  const [users, setUsers] = useState<Iuser[]>(initialUserData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem("users");
        const savedCurrentId = await AsyncStorage.getItem("currentId");
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        }
        if (savedCurrentId) {
          setCurrentId(Number(savedCurrentId));
        }
      } catch (error) {
        console.error("Failed to load data from storage", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("users", JSON.stringify(users));
        await AsyncStorage.setItem("currentId", currentId.toString());
      } catch (error) {
        console.error("Failed to save data to storage", error);
      }
    };

    saveData();
  }, [users, currentId]);

  const dataToshow: Iuser[] = users.filter(({ isCompleted, isDeleted }) =>
    activeIndex === 1
      ? isCompleted && !isDeleted
      : activeIndex === 2
      ? !isCompleted && !isDeleted
      : activeIndex === 3
      ? isDeleted
      : true
  );
  const dataNames =
    activeIndex === 1
      ? "Completed"
      : activeIndex === 2
      ? "Pending"
      : activeIndex === 3
      ? "Deleted"
      : "All";
  const handleAddTodo = () => {
    if (!userName || !userTask || userName.length <= 3) return;
    setCurrentId((prevId) => prevId + 1);
    const newTodo: Iuser = {
      id: currentId,
      userName,
      userTask,
      isCompleted: false,
      isDeleted: false,
    };
    setUserName("");
    setUserTask("");
    setUsers((prevUsers) => [...prevUsers, newTodo]);
  };

  const handleDeleteTodo = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              isDeleted: true,
            }
          : user
      )
    );
  };

  const handleChangeStatus = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              isCompleted: !user.isCompleted,
            }
          : user
      )
    );
  };

  return (
    <>
      <Header />
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText Color="#4C30FF" type="title">
            Hi!
          </ThemedText>
          <HelloWave />
        </ThemedView>
        <Input text={userName} setText={setUserName} placeholder="User Name" />
        <Input text={userTask} setText={setUserTask} placeholder="User Task" />
        <NewButton
          backgroundColor="#4C30FF"
          onPress={handleAddTodo}
          children="Add"
        />
        <ThemedView style={styles.filterbtns}>
          {filters.map((btn, i) => (
            <NewButton
              key={i}
              onPress={() => setActiveIndex(i)}
              children={btn}
              type="primary"
              backgroundColor={activeIndex === i ? "#4C30FF" : ""}
              Color={activeIndex === i ? "#ffffff" : "#000000"}
            />
          ))}
        </ThemedView>
        <ThemedText type="subtitle">
          {dataNames} Todos({dataToshow.length})
        </ThemedText>
        <ThemedView style={styles.container}>
          {dataToshow.map((props, i) => (
            <Card
              key={i}
              {...props}
              handleDelete={handleDeleteTodo}
              handleStatus={handleChangeStatus}
            />
          ))}
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  filterbtns: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    borderRadius: 100,
    padding: 5,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  container: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderBottomWidth: 0,
    borderRadius: 5,
    overflow: "hidden",
  },
});
