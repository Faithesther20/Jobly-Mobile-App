import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useCallback, useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {};

  const { data, isLoading, error, refresh } = useFetch("job-details", {
    job_id: params.id,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerBackVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            {isLoading?(
              <ActivityIndicator size={"large"} color={COLORS.primary}/>
            ): error ? (
              <Text>Something went wrong</Text>
            ): data.length=== 0?(
              <Text>No data</Text>
            ):(
              <View style={{padding:SIZES.medium, paddingBottom:100}}>
                <Company/>                                                                                                                          

              </View>
            )}
            </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
