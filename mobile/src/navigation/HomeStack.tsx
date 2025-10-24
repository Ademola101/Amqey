import AddProduct from "./screens/AddProduct/AddProduct";
import HomeScreen from "./screens/Home/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "./screens/ProductDetails";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}