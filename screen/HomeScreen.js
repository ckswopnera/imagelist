import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { base_url } from "../utils/url";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function HomeScreen() {
  const [listData, setlistData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [offset, setOffset] = useState(10);
  const [dataLength, setdataLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const [selected, setselected] = useState([]);
  const navigation = useNavigation();
  // variables
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderFooterModal = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()}>
          <View
            style={{
              padding: 12,
              // marginTop: 12,
              marginHorizontal: 12,

              borderRadius: 12,
              backgroundColor: "#246BFD",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "800" }}
            >
              CLOSE
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    []
  );

  /* Using Fetch Api */
  // useEffect(() => {
  //   fetch(base_url)
  //     .then((response) => response.json())
  //     .then((json) => console.log(json))
  //     .catch((e) => console.log(e));
  // }, []);

  const apiCall = () => {
    /* Using Axios  */
    axios
      .get(base_url + "?page=2&limit=" + offset)
      .then((response) => {
        setlistData(response.data);
        //   console.log(response.data)
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    apiCall();
  }, []);

  const onRefresh = () => {
    /* Using Pull to refresh */
    setIsRefreshing(true);

    setTimeout(() => {
      apiCall();
    }, 500);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };
  const renderFooter = () => {
    return (
      //Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const loadMore = () => {
    /* onreachend load will happen  */
    axios
      .get(base_url + "?page=2&limit=" + offset)
      .then((response) => {
        // setlistData([...listData, ...response.data]);
        //   console.log(response.data)
        // console.log("length", response.data.length);
        setLoading(true);
        if (response.data.length > 0 && dataLength <= 20) {  //due to the api limit was upto 20 https://picsum.photos/v2/list?page=2&limit=20 
          setdataLength(response.data.length);
          setOffset(offset + 1);
          //After the response increasing the offset by 1 for the next API call.

          setlistData(response.data);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  };
  return (
   
    
    <SafeAreaView style={styles.container}>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        footerComponent={renderFooterModal}
        backgroundStyle={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#000",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        handleIndicatorStyle={{ backgroundColor: "#000" }}
      >
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <Text style={{ color: "#000" }}>id: {selected.id}</Text>
          <Text style={{ color: "#000" }}>author: {selected.author}</Text>
          <Text style={{ color: "#000" }}>
            download url: {selected.download_url}
          </Text>
          <Text style={{ color: "#000" }}>url: {selected.url}</Text>
        </View>
      </BottomSheetModal>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          //   justifyContent: "space-evenly",
          marginVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: "#000",
        }}
      >
        <Text style={styles.author}>author</Text>
        <Text style={styles.image}>Image</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={listData}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handlePresentModalPress();
                setselected(item);
                console.log(item);
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  paddingVertical: 5,
                }}
              >
                <Text style={styles.authorinner}>{item.author}</Text>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: item.download_url,
                  }}
                  style={styles.imageinner}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          loadMore();
        }}
        onEndReachedThreshold={0.5}
      />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "900",
  },
  author: {
    width: "30%",
    textAlign: "center",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  authorinner: {
    width: "30%",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
    fontWeight: "bold", shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: "70%",
    textAlign: "center",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  imageinner: { width: "70%", height: 150 ,marginHorizontal:2},
});
