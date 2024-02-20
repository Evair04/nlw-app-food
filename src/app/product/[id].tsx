import { Image, Text, View } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Redirect } from "expo-router";

import { useCartStore } from "@/stores/cart-store";

import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";

export default function Product() {

    const cartStore = useCartStore();
    const navegation = useNavigation();
    const { id } = useLocalSearchParams();

    const product = PRODUCTS.find((product) => product.id === id);

    function handleAddToCart() {
        cartStore.add(product!);
        navegation.goBack();
    }

    if (!product) {
        return <Redirect href="/" />;
    }
    
    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52" resizeMode="cover" />


            <View className="p-6">

            <Text
                className="text-white text-xl font-heading my-2"
            >{product.title}
            </Text>

                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>
                <Text className="text-slate-400 text-sm leading-5 mt-1">
                    {product.description}
                </Text>

                {
                    product.ingredients.length > 0 && (
                        <View className="mt-6">
                            <Text className="text-lime-400 text-base font-heading mb-2">
                                Ingredientes
                            </Text>
                            <View className="flex flex-col gap-1">
                                {
                                    product.ingredients.map((ingredient, index) => (
                                        <Text key={index} className="text-slate-400 text-sm leading-5">
                                            { "\u2022"} {ingredient}
                                        </Text>
                                    ))
                                }
                            </View>
                        </View>
                    )
                }
            </View>
            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20} />
                    </Button.Icon>
                    <Button.Text> Adicionar ao carrinho</Button.Text>
                </Button>

                <LinkButton title="Voltar ao Cardápio" href="/" />
            </View>
        </View>


    );
}